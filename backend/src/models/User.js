import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String },            // null for OAuth-only accounts
        phone: { type: String, default: '' },
        role: { type: String, enum: ['client', 'runner', 'admin'], default: 'client' },
        isActive: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false }, // email/password accounts only
        avatarUrl: { type: String, default: '' },
        firebaseUid: { type: String, default: '' },     // links Firebase UID → MongoDB user
    },
    { timestamps: true }
)

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
