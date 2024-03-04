import { config } from '@vue-email/compiler'
import { Resend } from 'resend'
import sendgrid from '@sendgrid/mail'

export const vueEmail = config('./src/email/templates', {
  verbose: false,
})

export interface MailerSendOptions {
  from: string
  to: string
  subject: string
  html: string
}

export interface Mailer {
  name: string
  send(options: MailerSendOptions): any
}

export const resend = new Resend(process.env['ResendAPIKey']!)

sendgrid.setApiKey(process.env['SendgridAPIKey']!)

export { sendgrid }

// Create a mailer that uses Sendgrid
export const sendgridMailer: Mailer = {
  name: 'sendgrid',
  send: async (options) => {
    return await sendgrid.send(options)
  },
}

// Create a mailer that uses Resend
export const resendMailer: Mailer = {
  name: 'resend',
  send: async (options) => {
    return await resend.emails.send(options)
  },
}

export const chooseMailer = (env: string | undefined): Mailer => {
  switch (env) {
    case 'resend':
      return resendMailer
    case 'sendgrid':
      return sendgridMailer
    default:
      return resendMailer
  }
}
