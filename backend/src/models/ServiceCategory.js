import mongoose from 'mongoose'

const serviceCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        icon: { type: String, default: '' },
        description: { type: String, default: '' },
        basePrice: { type: Number, required: true },
        ratePerMin: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export default mongoose.model('ServiceCategory', serviceCategorySchema)
