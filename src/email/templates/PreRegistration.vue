<script setup>
const name = '{% it.name %}'
const email = '{% it.email %}'
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>{{ name }}, ¡Ya estás dentro!</EPreview>
      <EBody class="bg-white my-auto mx-auto font-sans">
        <EContainer
          class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]"
        >
          <ESection class="mt-[32px]">
            <EImg
              src="https://vue-email-demo.vercel.app/static/vercel-logo.png"
              width="40"
              height="37"
              alt="Vercel"
              class="my-0 mx-auto"
            />
          </ESection>
          Hola {{ name }}, ¡Ya estás dentro!
          <EHeading
            class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"
          >
            Join <strong>{{ email }}</strong> on <strong>Vercel</strong>
          </EHeading>
          <EText class="text-black text-[14px] leading-[24px]">
            Hello {{ name }},
          </EText>
          <EText class="text-black text-[14px] leading-[24px]">
            <strong>bukinoshita</strong> (
            <ELink
              href="mailto:{% it.invitedByEmail %}"
              class="text-blue-600 no-underline"
            >
            </ELink>
            ) has invited you to the <strong>teams</strong> team on
            <strong>Vercel</strong>.
          </EText>
          <ESection>
            <ERow>
              <EColumn align="right">
                <EImg
                  class="rounded-full"
                  src="https://vue-email-demo.vercel.app/static/vercel-user.png"
                  width="64"
                  height="64"
                />
              </EColumn>
              <EColumn align="center">
                <EImg
                  src="https://vue-email-demo.vercel.app/static/vercel-arrow.png"
                  width="12"
                  height="9"
                  alt="invited you to"
                />
              </EColumn>
              <EColumn align="left">
                <EImg
                  class="rounded-full"
                  src="https://vue-email-demo.vercel.app/static/vercel-team.png"
                  width="64"
                  height="64"
                />
              </EColumn>
            </ERow>
          </ESection>
          <ESection class="text-center mt-[32px] mb-[32px]">
            <EButton
              px="20"
              py="12"
              class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              :href="email"
            >
              Join the team
            </EButton>
          </ESection>
          <EText class="text-black text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:
            <ELink :href="name" class="text-blue-600 no-underline"> </ELink>
          </EText>
          <EHr
            class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"
          />
          <EText class="text-[#666666] text-[12px] leading-[24px]">
            This invitation was intended for
            <span class="text-black">{{ name }}</span
            >.This invite was sent from <span class="text-black"></span> located
            in <span class="text-black"></span>. If you were not expecting this
            invitation, you can ignore this email. If you are concerned about
            your account's safety, please reply to this email to get in touch
            with us.
          </EText>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
