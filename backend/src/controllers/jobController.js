import Job from '../models/Job.js'
import User from '../models/User.js'
import Runner from '../models/Runner.js'
import Notification from '../models/Notification.js'

// GET /api/jobs — admin sees all, runner sees available (matching), client sees own
export async function listJobs(req, res) {
    const { role, id } = req.user
    let filter = {}
    if (role === 'runner') filter = { status: 'matching' }
    else if (role === 'client') filter = { clientId: id }

    const jobs = await Job.find(filter)
        .populate('clientId', 'name avatarUrl')
        .populate({ path: 'runnerId', populate: { path: 'userId', select: 'name avatarUrl' } })
        .sort({ createdAt: -1 })
    res.json(jobs)
}

// GET /api/jobs/client/me
export async function myClientJobs(req, res) {
    const jobs = await Job.find({ clientId: req.user.id }).sort({ createdAt: -1 })
    res.json(jobs)
}

// GET /api/jobs/runner/me
export async function myRunnerJobs(req, res) {
    let runner = await Runner.findOne({ userId: req.user.id })
    if (!runner && req.user.role === 'runner') {
        runner = await Runner.create({ userId: req.user.id })
    }
    if (!runner) return res.status(404).json({ message: 'Runner profile not found' })
    const jobs = await Job.find({ runnerId: runner._id }).sort({ createdAt: -1 })
    res.json(jobs)
}

// GET /api/jobs/:id
export async function getJob(req, res) {
    const job = await Job.findById(req.params.id)
        .populate('clientId', 'name phone avatarUrl')
        .populate({ path: 'runnerId', populate: { path: 'userId', select: 'name avatarUrl phone' } })
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json(job)
}

// POST /api/jobs — client creates job
export async function createJob(req, res) {
    const { serviceType, branchName, address, scheduledTime, payAmount, instructions } = req.body
    if (!serviceType || !branchName || !scheduledTime || !payAmount) {
        return res.status(400).json({ message: 'serviceType, branchName, scheduledTime and payAmount required' })
    }
    const job = await Job.create({
        clientId: req.user.id,
        serviceType, branchName, address, scheduledTime, payAmount, instructions,
    })
    res.status(201).json(job)
}

// PATCH /api/jobs/:id/status — runner updates status (or admin)
export async function updateJobStatus(req, res) {
    const { status } = req.body
    const validStatuses = ['matching', 'enRoute', 'waiting', 'nearFront', 'complete', 'cancelled']
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' })

    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    // If runner is accepting, assign them
    if (status === 'enRoute' && req.user.role === 'runner') {
        const runner = await Runner.findOne({ userId: req.user.id })
        if (runner) job.runnerId = runner._id
    }

    job.status = status
    await job.save()

    // Notify client
    await Notification.create({
        userId: job.clientId,
        type: status,
        title: `Job Update: ${status}`,
        body: `Your job at ${job.branchName} is now: ${status}`,
    })

    res.json(job)
}

// POST /api/jobs/:id/accept — runner accepts job
export async function acceptJob(req, res) {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    if (job.status !== 'matching') return res.status(400).json({ message: 'Job is no longer available' })

    let runner = await Runner.findOne({ userId: req.user.id })
    if (!runner && req.user.role === 'runner') {
        runner = await Runner.create({ userId: req.user.id })
    }
    if (!runner) return res.status(404).json({ message: 'Runner profile not found' })

    job.runnerId = runner._id
    job.status = 'enRoute'
    await job.save()

    // Notify client
    await Notification.create({
        userId: job.clientId,
        type: 'job_accepted',
        title: 'Runner Assigned',
        body: `A runner is on their way to ${job.branchName}`,
    })

    res.json(job)
}

// PATCH /api/jobs/:id/rate — client rates complete job
export async function rateJob(req, res) {
    const { rating, comment } = req.body
    if (!rating) return res.status(400).json({ message: 'Rating is required' })

    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    if (job.status !== 'complete') return res.status(400).json({ message: 'Only completed jobs can be rated' })

    job.rating = rating
    job.ratingComment = comment || ''
    await job.save()

    res.json(job)
}
