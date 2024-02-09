import { config } from '@vue-email/compiler'
import { Resend } from 'resend'

export const vueEmail = config('./src/email/templates', {
  verbose: true,
})

export const resend = new Resend(process.env['ResendAPIKey']!)
