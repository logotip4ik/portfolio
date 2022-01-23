import path from 'path'
import fs from 'fs'
import consola from 'consola'

const logger = consola.withScope('nuxt:cloudflare-headers')
const headerFilename = '_headers'

export default function (moduleOptions = {}) {
  const self = this

  const options = {
    ...(self.options.cloudflareHeaders || {}),
    ...moduleOptions,
  }

  const contentToWrite = stringify(options)
  const distPath = self.nuxt.options.generate.dir

  self.nuxt.hook('generate:done', () => {
    fs.writeFile(path.join(distPath, headerFilename), contentToWrite, () =>
      logger.success('Nuxt `Cloudflare Headers` added')
    )
  })
}

function stringify(obj) {
  let string = ''

  for (const [host, headers] of Object.entries(obj)) {
    if (!string) string += host
    else string += `\n${host}`

    string += headers.reduce((acc, header) => {
      const [headerName, headerValue] = Object.entries(header)[0]

      return acc + `\n\t${headerName}:${headerValue}`
    }, '')
  }

  return string
}
