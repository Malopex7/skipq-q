import { Router } from 'express'
import { listUsers, getUser, suspendUser, activateUser } from '../controllers/userController.js'
import { protect } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'

const router = Router()
router.use(protect)
router.get('/', adminOnly, listUsers)
router.patch('/:id/suspend', adminOnly, suspendUser)
router.patch('/:id/activate', adminOnly, activateUser)
router.get('/:id', getUser)
export default router
