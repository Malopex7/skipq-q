import { Router } from 'express'
import { listNotifications, markAllRead } from '../controllers/notificationController.js'
import { protect } from '../middlewares/auth.js'

const router = Router()
router.use(protect)
router.get('/', listNotifications)
router.patch('/read-all', markAllRead)
export default router
