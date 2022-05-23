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

    const distPath = nuxt.options.generate.dir;
    const contentToWrite = stringify(options);

    // this wont actually work cuz of this:
    // @link https://github.com/nuxt/framework/issues/4698
    nuxt.hook('generate:done', () => {
      try {
        fs.writeFileSync(path.join(distPath, headerFilename), contentToWrite, {
          encoding: 'utf-8',
        });

        logger.success('Wrote cloudflare headers to public dir');
      } catch (error) {
        logger.fatal('something was broken creating a file', error);
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
