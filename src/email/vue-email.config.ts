import { config } from '@vue-email/compiler'

export const vueEmail = config('./src/email/templates', {
  verbose: true,
})
