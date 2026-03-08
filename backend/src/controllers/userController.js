import User from '../models/User.js'

// GET /api/users — admin lists all users
export async function listUsers(req, res) {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
}

// GET /api/users/:id
export async function getUser(req, res) {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
}

// PATCH /api/users/:id/suspend — admin suspends user
export async function suspendUser(req, res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
    ).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
}
// PATCH /api/users/:id/activate — admin activates user
export async function activateUser(req, res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: true },
        { new: true }
    ).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
}
