import express from 'express'
import { listJobs, getJob, createJob, updateJobStatus, myClientJobs, myRunnerJobs, acceptJob, rateJob } from '../controllers/jobController.js'
import { myEarnings } from '../controllers/runnerController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()
router.use(protect)  // all job routes require auth

router.get('/client/me', myClientJobs)
router.get('/runner/me', myRunnerJobs)
router.get('/runner/stats', myEarnings) // Map to existing earnings logic
router.get('/', listJobs)
router.get('/:id', getJob)
router.post('/', createJob)
router.post('/:id/accept', acceptJob)
router.patch('/:id/status', updateJobStatus)
router.patch('/:id/rate', rateJob)

export default router
