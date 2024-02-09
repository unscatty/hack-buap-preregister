import { createTransport } from 'nodemailer'

const smptTransport = createTransport({
  host: process.env['SMTPHost'],
  port: parseInt(process.env['SMTPPort']!),
  auth: {
    user: process.env['SMTPUser'],
    pass: process.env['SMTPPass'],
  },
  secure: true,
})

export const smtpMailer = smptTransport
