import fs from 'fs';
import path from 'path';
import consola from 'consola';
import { defineNuxtModule } from '@nuxt/kit';

const headerFilename = '_headers';
const logger = consola.withScope('nuxt3:cloudflare-headers');

export default defineNuxtModule({
  meta: {
    name: 'CloudflareHeaders',
    configKey: '__cloudflare_headers',
    compatibility: { nuxt: '^3.0.0' },
  },
  setup(moduleOptions = {}, nuxt) {
    const options = {
      ...(nuxt.options.cloudflareHeaders || {}),
      ...moduleOptions,
    };

    const contentToWrite = stringify(options);
    const distPath = nuxt.options.generate.dir;

    nuxt.hook('export:done', () => {
      try {
        fs.writeFileSync(path.join(distPath, headerFilename), contentToWrite, {
          encoding: 'utf-8',
        });
        logger.success('Wrote cloudflare headers to dist folder');
      } catch (error) {
        logger.error('Cannot write the cloudflare headers to file: ', error);
      }
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
