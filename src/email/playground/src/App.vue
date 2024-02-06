<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ECodeBlock, useRender } from 'vue-email'

import EmailTemplate from '../../templates/PreRegistration.vue'

const email = ref('')


const data = {
  invitedByUsername: 'bukinoshita',
  teamName: 'My project',
  username: 'John asds',
  invitedByEmail: 'email',
  inviteLin: 'https://vercel.com/teams/invite/foo',
  inviteFromIp: '127.0.0.1',
  inviteFromLocation: 'San Francisco, CA',
}

onMounted(async () => {
  const result = await useRender(
    EmailTemplate,
    { props: data },
    {
      pretty: true,
    }
  )

  email.value = result.html

  console.log(result.html)
})

</script>

<template>
  <iframe :srcdoc="email"></iframe>
  <Suspense>
    <EmailTemplate v-bind="data" />
  </Suspense>
</template>

<style scoped>
#app,
body,
html,
iframe {
  width: 100%;
  height: 100vh;
}
</style>
