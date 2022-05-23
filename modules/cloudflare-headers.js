import fs from 'fs';
import path from 'path';
import consola from 'consola';
import { defineNuxtModule } from '@nuxt/kit';

const headerFilename = '_headers';
const logger = consola.withScope('nuxt3:cloudflare-headers');

export default defineNuxtModule({
  meta: {
    name: 'cloudflare-headers',
    configKey: '_cloudflare_headers',
    compatibility: { nuxt: '^3.0.0' },
  },
  setup(moduleOptions = {}, nuxt) {
    const options = {
      ...(nuxt.options.cloudflareHeaders || {}),
      ...moduleOptions,
    };

    const contentToWrite = stringify(options);
    const distPath = nuxt.options.generate.dir;

    nuxt.hook('generate:routeCreated', () => {
      fs.writeFile(path.join(distPath, headerFilename), contentToWrite, () =>
        logger.success('Nuxt `Cloudflare Headers` added')
      );
    });
  },
});

function stringify(obj) {
  let string = '';

  for (const [host, headers] of Object.entries(obj)) {
    if (!string) string += host;
    else string += `\n${host}`;

    string += headers.reduce((acc, header) => {
      const [headerName, headerValue] = Object.entries(header)[0];

      return acc + `\n\t${headerName}:${headerValue}`;
    }, '');
  }

  return string;
}
