import { Router } from 'express'
import { listServices, createService, updateService, toggleService } from '../controllers/serviceController.js'
import { protect } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'

const router = Router()
router.get('/', listServices)  // public
router.post('/', protect, adminOnly, createService)
router.patch('/:id', protect, adminOnly, updateService)
router.patch('/:id/toggle', protect, adminOnly, toggleService)
export default router
