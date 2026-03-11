import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ServiceCategory from '../src/models/ServiceCategory.js'

dotenv.config()

const services = [
    {
        name: 'Grocery Shopping',
        icon: '🛒',
        description: 'Let a runner handle your grocery shopping and delivery.',
        basePrice: 80,
        ratePerMin: 0.5,
        isActive: true,
    },
    {
        name: 'Post Office',
        icon: '📮',
        description: 'Skip the post office queue. We collect and drop off your parcels.',
        basePrice: 60,
        ratePerMin: 0.5,
        isActive: true,
    },
    {
        name: 'Home Affairs',
        icon: '🏛️',
        description: 'Avoid long Home Affairs queues for documents and ID-related services.',
        basePrice: 150,
        ratePerMin: 1,
        isActive: true,
    },
    {
        name: 'SARS / eFiling',
        icon: '💼',
        description: 'Get assistance with SARS visits and eFiling submissions.',
        basePrice: 200,
        ratePerMin: 1,
        isActive: true,
    },
    {
        name: 'Bank Queue',
        icon: '🏦',
        description: 'Send a runner to stand in queue at your bank branch.',
        basePrice: 70,
        ratePerMin: 0.75,
        isActive: true,
    },
    {
        name: 'Hospital / Clinic',
        icon: '🏥',
        description: 'Let a runner queue at a clinic or hospital on your behalf.',
        basePrice: 100,
        ratePerMin: 1,
        isActive: true,
    },
    {
        name: 'Traffic Department',
        icon: '🚗',
        description: 'Licence renewals, fines and more — no waiting required.',
        basePrice: 120,
        ratePerMin: 0.5,
        isActive: true,
    },
    {
        name: 'Pharmacy',
        icon: '💊',
        description: 'Prescription collection and OTC product pickups.',
        basePrice: 50,
        ratePerMin: 0.25,
        isActive: true,
    },
]

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

        for (const svc of services) {
            await ServiceCategory.updateOne({ name: svc.name }, svc, { upsert: true })
            console.log(`✓ Upserted: ${svc.name}`)
        }

        console.log('\n✅ Services seeded successfully!')
    } catch (err) {
        console.error('❌ Seed failed:', err)
    } finally {
        await mongoose.disconnect()
    }
}

seed()
