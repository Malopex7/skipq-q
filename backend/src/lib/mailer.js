// src/lib/mailer.js
// Sends email via Ethereal (dev) or SMTP (prod).
// In dev: logs preview URL to console. In prod: set real SMTP_* vars.

import nodemailer from 'nodemailer'

let transporter

async function getTransporter() {
    if (transporter) return transporter

    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your_app_password') {
        // Production SMTP (e.g. Gmail app password)
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        })
    } else {
        // Development: create an Ethereal test account on-the-fly
        const testAccount = await nodemailer.createTestAccount()
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: { user: testAccount.user, pass: testAccount.pass },
        })
        console.log('📧  Ethereal account created:', testAccount.user)
    }

    return transporter
}

/**
 * Send an email. In dev mode the Ethereal preview URL is logged.
 * @param {{ to: string, subject: string, html: string }} opts
 */
export async function sendMail({ to, subject, html }) {
    const t = await getTransporter()
    const info = await t.sendMail({
        from: `"SkipQ" <${process.env.SMTP_USER ?? 'no-reply@skipq.co'}>`,
        to,
        subject,
        html,
    })
    // Log preview URL in development
    const preview = nodemailer.getTestMessageUrl(info)
    if (preview) console.log('📬  Email preview:', preview)
    return info
}
