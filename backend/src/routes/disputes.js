import { Router } from 'express'
import { listDisputes, createDispute, resolveDispute } from '../controllers/disputeController.js'
import { protect } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'

const router = Router()
router.use(protect)
router.get('/', adminOnly, listDisputes)
router.post('/', createDispute)
router.patch('/:id/resolve', adminOnly, resolveDispute)
export default router
