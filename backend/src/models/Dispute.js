import mongoose from 'mongoose'

const disputeSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        runnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Runner', default: null },
        issueType: { type: String, required: true },
        details: { type: String, default: '' },
        status: { type: String, enum: ['open', 'investigating', 'resolved'], default: 'open' },
        resolution: { type: String, default: '' },
    },
    { timestamps: true }
)

export default mongoose.model('Dispute', disputeSchema)
