import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
    {
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        runnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Runner', default: null },
        serviceType: { type: String, required: true },
        branchName: { type: String, required: true },
        address: { type: String, default: '' },
        scheduledTime: { type: Date, required: true },
        status: {
            type: String,
            enum: ['matching', 'enRoute', 'waiting', 'nearFront', 'complete', 'cancelled'],
            default: 'matching',
        },
        payAmount: { type: Number, required: true },
        proofPhotoUrl: { type: String, default: '' },
        instructions: { type: String, default: '' },
        rating: { type: Number, min: 1, max: 5 },
        ratingComment: { type: String, default: '' },
    },
    { timestamps: true }
)

export default mongoose.model('Job', jobSchema)
