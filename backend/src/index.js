// src/index.js
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import runnerRoutes from './routes/runners.js'
import userRoutes from './routes/users.js'
import serviceRoutes from './routes/services.js'
import disputeRoutes from './routes/disputes.js'
import notificationRoutes from './routes/notifications.js'

const app = express()

// ─── Core Middleware ────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())

// ─── Routes ─────────────────────────────────────────────────────────────────
app.get('/api/test', (req, res) => res.json({ message: 'SkipQ backend is running' }))
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/runners', runnerRoutes)
app.use('/api/users', userRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/disputes', disputeRoutes)
app.use('/api/notifications', notificationRoutes)

// ─── Global Error Handler ───────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err)
  res.status(err.status ?? 500).json({ message: err.message ?? 'Internal server error' })
})

// ─── Connect DB → Start Server ──────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    const port = process.env.PORT ?? 5000
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`))
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err)
    process.exit(1)
  })
