import { config } from '@vue-email/compiler'
import { Resend } from 'resend'
import sendgridMail from '@sendgrid/mail'

export const vueEmail = config('./src/email/templates', {
  verbose: false,
})

export const resend = new Resend(process.env['ResendAPIKey']!)

sendgridMail.setApiKey(process.env['SendgridAPIKey']!)

export { sendgridMail }
