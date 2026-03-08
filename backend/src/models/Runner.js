import mongoose from 'mongoose'

const runnerSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        idVerified: { type: Boolean, default: false },
        profilePhoto: { type: String, default: '' },
        serviceAreas: [{ type: String }],
        rating: { type: Number, default: 0, min: 0, max: 5 },
        jobsCompleted: { type: Number, default: 0 },
        status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
        totalEarnings: { type: Number, default: 0 },
        isOnline: { type: Boolean, default: false },
    },
    { timestamps: true }
)

export default mongoose.model('Runner', runnerSchema)
