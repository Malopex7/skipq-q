import { Router } from 'express'
import { listRunners, listPendingRunners, applyAsRunner, approveRunner, suspendRunner, unsuspendRunner, myEarnings, getMyProfile, toggleOnline } from '../controllers/runnerController.js'
import { protect } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'

const router = Router()
router.use(protect)
router.get('/me', getMyProfile)
router.patch('/me/toggle-online', toggleOnline)
router.get('/me/earnings', myEarnings)
router.post('/apply', applyAsRunner)
router.get('/', adminOnly, listRunners)
router.get('/pending', adminOnly, listPendingRunners)
router.patch('/:id/approve', adminOnly, approveRunner)
router.patch('/:id/suspend', adminOnly, suspendRunner)
router.patch('/:id/unsuspend', adminOnly, unsuspendRunner)
export default router
