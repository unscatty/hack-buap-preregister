<script setup>
const fullName = '{% it.firstName %} {% it.lastName %}'
const email = '{% it.email %}'
const links = [
  {
    name: 'Instagram',
    imgSrc:
      'https://hackathonbuapbb54.blob.core.windows.net/hack-assets/instagram.png?sp=r&st=2024-08-02T03:45:29Z&se=2099-08-02T11:45:29Z&spr=https&sv=2022-11-02&sr=b&sig=73TrHQKXA2m5pDdjbjsa5I97RYlSG2BI4kMtc0MVTJA%3D',
    url: 'https://www.instagram.com/lobohackathon/',
  },
  {
    name: 'TikTok',
    imgSrc:
      'https://hackathonbuapbb54.blob.core.windows.net/hack-assets/tiktok.png?sp=r&st=2024-08-02T03:50:29Z&se=2099-08-02T11:50:29Z&spr=https&sv=2022-11-02&sr=b&sig=j%2Fsy0OMUTcjbhVS%2BL5XHIM06Z132UlN5Xe5jhjBupfQ%3D',
    url: 'https://www.tiktok.com/@lobohackathon',
  },
  {
    name: 'Facebook',
    imgSrc:
      'https://hackathonbuapbb54.blob.core.windows.net/hack-assets/facebook.png?sp=r&st=2024-08-02T03:44:55Z&se=2099-08-02T11:44:55Z&spr=https&sv=2022-11-02&sr=b&sig=Otzxf6k62RU9EASG8FAWAwnKP0nFWzGIfq1AGRnVIGc%3D',
    url: 'https://www.facebook.com/lobohackathon/',
  },
  {
    name: 'Discord',
    imgSrc:
      'https://hackathonbuapbb54.blob.core.windows.net/hack-assets/discord.png?sp=r&st=2024-08-02T03:42:50Z&se=2099-08-02T11:42:50Z&spr=https&sv=2022-11-02&sr=b&sig=CHIID%2Bpllpu3bDo2MkkI80rJLXzUAAFzvPsVLWGEuy8%3D',
    url: 'https://discord.gg/DnFZNU9h',
  },
]
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>{{ fullName }}, ¡Ya estás dentro!</EPreview>
      <EBody class="bg-[#000] text-white my-auto mx-auto font-sans">
        <EContainer
          class="border border-solid text-[#fff] bg-[#000] border-[#eaeaea] pt-[20px] md:p-7 rounded mt-[40px] mb-[0px] mx-auto max-w-[465px]"
        >
          <!-- <a href="https://ibb.co/4T6f71W"><img src="https://i.ibb.co/ncH0bPr/pattern-pentan.png" alt="pattern-pentan" border="0"></a> -->
          <ESection
            class="m-[0px_auto] w-[680px] h-[400px] bg-[#024873] bg-[url('https://i.ibb.co/ncH0bPr/pattern-pentan.png')] bg-no-repeat [background-position:right_bottom]"
          >
            <EText class="text-[32px] leading-[40px] text-center m-8 font-mono">
              {{ fullName }},
              <br />
              <strong>¡Ya estás dentro!</strong>
            </EText>
            <EImg
              src="https://hackathonbuapbb54.blob.core.windows.net/hack-assets/lobo_personaje.png?sp=r&st=2024-08-02T03:49:10Z&se=2099-08-02T11:49:10Z&spr=https&sv=2022-11-02&sr=b&sig=HPdqxBlibOUnqRyO%2B1%2BJbq9SYl%2FOCqrhLmTFAenpZlw%3D"
              width="640"
              height="360"
              alt="Hackathon banner"
              class="mx-auto object-contain mb-[10px]"
            />
            <!-- <EImg
              src="https://www.pngitem.com/pimgs/m/95-958227_blue-gray-wolf-drawing-logo-free-download-png.png"
              width="40"
              height="37"
              alt="Lobo"
              class="my-0 mx-auto"
            /> -->
          </ESection>
          <EHeading
            class="text-[24px] font-normal text-center p-0 my-[30px] mx-0"
          >
            <strong>¡Ya estás dentro!</strong>
          </EHeading>
          <EText class="text-[18px] leading-[24px] pb-[32px]">
            Hola <strong>{{ fullName }} </strong>,
          </EText>
          <EText class="text-[16px] leading-[28px]">
            ¡Gracias por registrarte para la primer edición del
            <strong>Lobo Hackathon Buap 2024!</strong>
          </EText>
          <EText class="text-[14px] leading-[24px]">
            Nos alegra mucho contar contigo para nuestra primer edición del
            hackathon. ¡Estamos ansiosos por ver tu talento en acción y
            compartir juntos una experiencia llena de innovación y aprendizaje!
          </EText>
          <EText class="text-[14px] leading-[24px]">
            En los próximos días, recibirás más detalles sobre el evento,
            incluyendo información sobre los desafíos, horarios y recursos que
            te ayudarán a prepararte para la competencia, así como las fechas de
            registro.
          </EText>
          <EText class="text-[14px] leading-[24px]">
            No olvides seguirnos en nuestras redes sociales para estar al tanto
            de todas las novedades y participar en conversaciones con otros
            participantes y mentores. Si tienes alguna pregunta o necesitas
            ayuda, no dudes en ponerte en contacto con nuestro equipo
            organizador en cualquier momento. Estamos aquí para apoyarte en tu
            viaje hacia el éxito en el Lobo Hackathon BUAP 2024.
          </EText>
          <ESection class="text-center mt-[16px] mb-[16px]">
            <EText class="text-[24px] leading-[24px] text-center">
              <strong>¡Nos vemos pronto!</strong>
            </EText>
          </ESection>

          <ESection className="mt-[50px] px-[50px]">
            <ERow>
              <EColumn v-for="link in links" :key="link.name">
                <ELink :href="link.url" class="underline font-bold">
                  <EImg
                    :src="link.imgSrc"
                    width="24"
                    height="24"
                    :alt="link.name"
                    class="my-0 mx-auto"
                  />
                </ELink>
              </EColumn>
            </ERow>
          </ESection>
          <EHr
            class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"
          />
          <!-- Diclaimer -->
          <ESection>
            <EText class="text-[#bbb8b8] text-[10px] leading-[16px]">
              ADVERTENCIA DE PRIVACIDAD. La información contenida en este correo
              se dirige exclusivamente a su destinatario; puede contener
              INFORMACIÓN CONFIDENCIAL cuya divulgación está prohibida por la
              ley. Si recibió este mensaje por error, evite su utilización,
              reproducción, o difusión, debiendo eliminarlo de su computadora o
              cualquier dispositivo electrónico y comunicarlo inmediatamente por
              esta vía a su emisor. La información de este correo, así como la
              contenida en los documentos que se adjuntan, pueden ser objeto de
              solicitudes de acceso a la información, sin perjuicio de las
              limitantes legales al derecho de acceso a la información. Puede
              consultar los avisos de privacidad para el tratamiento de datos
              personales con diversas finalidades en
              <ELink href="https://transparencia.buap.mx">
                https://transparencia.buap.mx
              </ELink>
              .
            </EText>
            <EText class="text-[#bbb8b8] text-[10px] leading-[16px]">
              STATEMENT OF CONFIDENTIALITY. The information contained in this
              email is addressed exclusively to its addressee; may contain
              CONFIDENTIAL INFORMATION whose disclosure is prohibited by law. If
              you received this message in error, avoid its use, reproduction or
              dissemination, and you must delete it from your computer or any
              electronic device and immediately notify the issuer by this means.
              The information in this email, as well as that contained in the
              attached documents, may be subject to requests for access to
              information, without prejudice to the legal limitations on the
              right of access to information. You can consult the privacy
              notices for the processing of personal data for various purposes
              at
              <ELink href="https://transparencia.buap.mx">
                https://transparencia.buap.mx
              </ELink>
              .
            </EText>
            <EText class="text-[#bbb8b8] text-[10px] leading-[16px]">
              La información contenida en este correo se dirige exclusivamente a
              su destinatario; puede contener INFORMACIÓN CONFIDENCIAL cuya
              divulgación está prohibida por la ley. Si recibió este mensaje por
              error, evite su utilización, reproducción, o difusión, debiendo
              eliminarlo de su computadora o cualquier dispositivo electrónico y
              comunicarlo inmediatamente por esta vía a su emisor.
            </EText>
            <EText class="text-[#bbb8b8] text-[10px] leading-[16px]">
              La información de este correo, así como la contenida en los
              documentos que se adjuntan, pueden ser objeto de solicitudes de
              acceso a la información, sin perjuicio de las limitantes legales
              al derecho de acceso a la información.
            </EText>
            <EText class="text-[#bbb8b8] text-[10px] leading-[16px]">
              Puede consultar los avisos de privacidad para el tratamiento de
              datos personales con diversas finalidades en
              <ELink href="https://transparencia.buap.mx">
                https://transparencia.buap.mx
              </ELink>
              .
            </EText>
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
