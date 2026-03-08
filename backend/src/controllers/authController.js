import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import admin from '../firebase.js'
import User from '../models/User.js'
import Runner from '../models/Runner.js'
import { sendMail } from '../lib/mailer.js'

const signToken = (user) =>
    jwt.sign(
        { id: user._id, role: user.role, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

const userPayload = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, avatarUrl: u.avatarUrl })

// ─── POST /api/auth/google ─────────────────────────────────────────────────
export async function googleAuth(req, res) {
    const { idToken } = req.body
    if (!idToken) return res.status(400).json({ message: 'idToken required' })

    let decoded
    try {
        decoded = await admin.auth().verifyIdToken(idToken)
    } catch (err) {
        console.error('Firebase verifyIdToken error:', err)
        return res.status(401).json({ message: 'Invalid Firebase token', error: err.message })
    }

    const { uid, email, name, picture } = decoded
    // Fallback if Google Auth token doesn't include an email
    const safeEmail = email || `${uid}@skipq.local`

    const query = [{ firebaseUid: uid }]
    if (email) query.push({ email })

    let user = await User.findOne({ $or: query })

    if (!user) {
        user = await User.create({
            firebaseUid: uid,
            email: safeEmail,
            name: name ?? safeEmail.split('@')[0],
            avatarUrl: picture ?? '',
            isVerified: true, // OAuth users are already verified by Google
        })
    } else if (!user.firebaseUid) {
        user.firebaseUid = uid
        user.isVerified = true
        await user.save()
    }

    if (!user.isActive) return res.status(403).json({ message: 'Account suspended' })

    res.json({ token: signToken(user), user: userPayload(user) })
}

// ─── POST /api/auth/register ───────────────────────────────────────────────
export async function register(req, res) {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password required' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already registered' })

    const verifyToken = crypto.randomBytes(32).toString('hex')
    const allowedRole = role === 'runner' ? 'runner' : 'client'

    const user = await User.create({
        name, email, password, role: allowedRole,
    })

    if (allowedRole === 'runner') {
        await Runner.create({ userId: user._id })
    }

    // Send Ethereal confirmation email
    const confirmUrl = `${process.env.FRONTEND_URL ?? 'http://localhost:3000'}/verify-email?token=${verifyToken}&id=${user._id}`
    await sendMail({
        to: email,
        subject: 'Welcome to SkipQ — Confirm your email',
        html: `
      <h2>Hi ${name}!</h2>
      <p>Thanks for registering. Click the link below to confirm your email address:</p>
      <a href="${confirmUrl}" style="background:#80f20d;color:#0f172a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin:16px 0">Confirm Email</a>
      <p>This link expires in 24 hours.</p>
      <p><small>If you didn't register, ignore this email.</small></p>
    `,
    })

    res.status(201).json({
        message: 'Registration successful. Check your email to confirm your account.',
        user: userPayload(user),
    })
}

// ─── POST /api/auth/login ──────────────────────────────────────────────────
export async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'email and password required' })

    const user = await User.findOne({ email })
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })
    if (!user.isActive) return res.status(403).json({ message: 'Account suspended' })

    res.json({ token: signToken(user), user: userPayload(user) })
}

// ─── GET /api/auth/me ──────────────────────────────────────────────────────
export async function getMe(req, res) {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
}
