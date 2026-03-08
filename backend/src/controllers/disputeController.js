import Dispute from '../models/Dispute.js'

// GET /api/disputes — admin
export async function listDisputes(req, res) {
    const disputes = await Dispute.find()
        .populate('clientId', 'name email')
        .populate({ path: 'jobId', select: 'serviceType branchName payAmount status' })
        .sort({ createdAt: -1 })
    res.json(disputes)
}

// POST /api/disputes — client or runner files a dispute
export async function createDispute(req, res) {
    const { jobId, issueType, details } = req.body
    if (!jobId || !issueType) return res.status(400).json({ message: 'jobId and issueType required' })
    const dispute = await Dispute.create({ jobId, clientId: req.user.id, issueType, details })
    res.status(201).json(dispute)
}

// PATCH /api/disputes/:id/resolve — admin resolves dispute
export async function resolveDispute(req, res) {
    const { resolution, status } = req.body
    const dispute = await Dispute.findByIdAndUpdate(
        req.params.id,
        { status: status ?? 'resolved', resolution },
        { new: true }
    )
    if (!dispute) return res.status(404).json({ message: 'Dispute not found' })
    res.json(dispute)
}
