import Notification from '../models/Notification.js'

// GET /api/notifications — user's own notifications, newest first
export async function listNotifications(req, res) {
    const notifs = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50)
    res.json(notifs)
}

// PATCH /api/notifications/read-all — mark all as read
export async function markAllRead(req, res) {
    await Notification.updateMany({ userId: req.user.id, isRead: false }, { isRead: true })
    res.json({ message: 'All notifications marked as read' })
}
