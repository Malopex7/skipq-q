import ServiceCategory from '../models/ServiceCategory.js'

// GET /api/services — public
export async function listServices(req, res) {
    const services = await ServiceCategory.find().sort({ name: 1 })
    res.json(services)
}

// POST /api/services — admin creates category
export async function createService(req, res) {
    const { name, icon, description, basePrice, ratePerMin } = req.body
    if (!name || basePrice == null) return res.status(400).json({ message: 'name and basePrice required' })
    const service = await ServiceCategory.create({ name, icon, description, basePrice, ratePerMin })
    res.status(201).json(service)
}

// PATCH /api/services/:id — admin edits
export async function updateService(req, res) {
    const service = await ServiceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!service) return res.status(404).json({ message: 'Service not found' })
    res.json(service)
}

// PATCH /api/services/:id/toggle — flip isActive
export async function toggleService(req, res) {
    const service = await ServiceCategory.findById(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found' })
    service.isActive = !service.isActive
    await service.save()
    res.json(service)
}
