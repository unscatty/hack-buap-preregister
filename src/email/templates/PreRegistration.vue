<script setup>
const name = '{% it.firstName %} {% it.lastName %}'
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
        <!-- <a href="https://ibb.co/4T6f71W"><img src="https://i.ibb.co/ncH0bPr/pattern-pentan.png" alt="pattern-pentan" border="0"></a> -->
          <ESection class="m-[0px_auto] w-[680px] h-[800px] bg-[#024873] bg-[url('https://i.ibb.co/ncH0bPr/pattern-pentan.png')] bg-no-repeat [background-position:right_bottom]">
            <EText
              class="text-white text-[32px] leading-[40px] text-center m-8 font-mono"
            >
              {{ username }},
              <br />
              <strong>¡Ya estás dentro!</strong>
            </EText>
            <EImg
              src="https://i.ibb.co/sK2rfDg/Picsart-24-02-06-20-33-48-475.png"
              width="640"
              height="360"
              alt="Hackathon banner"
              class="my-0 mx-auto object-contain"
            />
            <EImg
              src="https://www.pngitem.com/pimgs/m/95-958227_blue-gray-wolf-drawing-logo-free-download-png.png"
              width="40"
              height="37"
              alt="Lobo"
              class="my-0 mx-auto"
            />
          </ESection>
          <EHeading
            class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"
          >
            <strong>¡Ya estás dentro!</strong>
          </EHeading>
          <EText class="text-black text-[14px] leading-[24px]">
            Hola <strong>{{ username }} </strong>,
          </EText>
          <EText class="text-black text-[14px] leading-[24px]">
            ¡Gracias por registrarte para la primer edición del
            <strong>Lobo Hackathon Buap 2024!</strong>
            <br />
            <br />
            Zombie ipsum reversus ab viral inferno, nam rick grimes malum
            cerebro. De carne lumbering animata corpora quaeritis. Summus brains
            sit​​, morbo vel maleficia? De apocalypsi gorger omero undead
            survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo
            evil stalking monstra adventus resi dentevil vultus comedat
            cerebella viventium. Qui animated corpse.
          </EText>
          <ESection class="text-center mt-[32px] mb-[32px]">
            <EButton
              px="20"
              py="12"
              class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              :href="email"
            >
              Confirmar correo electrónico
            </EButton>
          </ESection>
          <EText class="text-black text-[14px] leading-[24px]">
            o copia y pega el siguiente enlace en tu navegador:
            <ELink :href="inviteLink" class="text-blue-600 no-underline">
              {{ inviteLink }}
            </ELink>
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
