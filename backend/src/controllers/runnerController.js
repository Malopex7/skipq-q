import Runner from '../models/Runner.js'
import User from '../models/User.js'
import Job from '../models/Job.js'

// GET /api/runners — admin: all runners with user details
export async function listRunners(req, res) {
    const runners = await Runner.find()
        .populate('userId', 'name email phone avatarUrl isActive')
        .sort({ createdAt: -1 })
    res.json(runners)
}

// GET /api/runners/pending — admin: pending applications only
export async function listPendingRunners(req, res) {
    const runners = await Runner.find({ status: 'pending' })
        .populate('userId', 'name email phone avatarUrl')
        .sort({ createdAt: -1 })
    res.json(runners)
}

// POST /api/runners/apply — authenticated user applies to become runner
export async function applyAsRunner(req, res) {
    const { serviceAreas } = req.body
    const existing = await Runner.findOne({ userId: req.user.id })
    if (existing) return res.status(409).json({ message: 'Runner profile already exists' })

    const runner = await Runner.create({ userId: req.user.id, serviceAreas: serviceAreas ?? [] })

    // Upgrade user role to runner
    await User.findByIdAndUpdate(req.user.id, { role: 'runner' })

    res.status(201).json(runner)
}

// PATCH /api/runners/:id/approve — admin approves runner
export async function approveRunner(req, res) {
    const runner = await Runner.findByIdAndUpdate(
        req.params.id,
        { status: 'active', idVerified: true },
        { new: true }
    )
    if (!runner) return res.status(404).json({ message: 'Runner not found' })
    res.json(runner)
}

// PATCH /api/runners/:id/suspend — admin suspends runner
export async function suspendRunner(req, res) {
    const runner = await Runner.findByIdAndUpdate(
        req.params.id,
        { status: 'suspended' },
        { new: true }
    )
    if (!runner) return res.status(404).json({ message: 'Runner not found' })
    await User.findByIdAndUpdate(runner.userId, { isActive: false })
    res.json(runner)
}

// PATCH /api/runners/:id/unsuspend — admin unsuspends runner
export async function unsuspendRunner(req, res) {
    const runner = await Runner.findByIdAndUpdate(
        req.params.id,
        { status: 'active' },
        { new: true }
    )
    if (!runner) return res.status(404).json({ message: 'Runner not found' })
    await User.findByIdAndUpdate(runner.userId, { isActive: true })
    res.json(runner)
}

// GET /api/runners/me/earnings
export async function myEarnings(req, res) {
    let runner = await Runner.findOne({ userId: req.user.id })
    if (!runner && req.user.role === 'runner') {
        runner = await Runner.create({ userId: req.user.id })
    }
    if (!runner) return res.status(404).json({ message: 'Runner profile not found' })

    const jobs = await Job.find({ runnerId: runner._id, status: 'complete' }).sort({ updatedAt: -1 })
    const total = jobs.reduce((sum, j) => sum + (j.payAmount ?? 0), 0)

    res.json({
        totalEarnings: total,
        jobsCompleted: jobs.length,
        recentJobs: jobs.slice(0, 10),
        runner,
    })
}

// GET /api/runners/me — authenticated runner profile
export async function getMyProfile(req, res) {
    let runner = await Runner.findOne({ userId: req.user.id }).populate('userId', 'name email phone avatarUrl')
    if (!runner && req.user.role === 'runner') {
        runner = await Runner.create({ userId: req.user.id })
        runner = await runner.populate('userId', 'name email phone avatarUrl')
    }
    if (!runner) return res.status(404).json({ message: 'Runner profile not found' })
    res.json(runner)
}

// PATCH /api/runners/me/toggle-online
export async function toggleOnline(req, res) {
    const runner = await Runner.findOne({ userId: req.user.id })
    if (!runner) return res.status(404).json({ message: 'Runner profile not found' })

    runner.isOnline = !runner.isOnline
    await runner.save()
    res.json({ isOnline: runner.isOnline })
}
