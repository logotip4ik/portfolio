require('dotenv').config();

const mailgun = require('mailgun-js');
const Joi = require('joi');
const Handlebars = require('handlebars');
const winston = require('winston');

// prettier-ignore
const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body style=" font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif; min-height: 100vh; margin: 0; padding: 0; " ><h1 align="center">New Message from Website</h1><table style=" padding: 10px 20px; background-color: antiquewhite; border-radius: 10px; width: 400px; margin: 0 auto; " ><tr style="text-align: left"><th style="padding-right: 10px">Name:</th><td>{{name}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Email:</th><td>{{email}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Message:</th><td>{{message}}</td></tr></table><h3 style="text-align: center; margin-top: 20px">Time: {{time}}</h3></body></html>';

const template = Handlebars.compile(html);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service ' },
  transports: [new winston.transports.File({ filename: 'main_log.log' })],
});

const schema = Joi.object({
  name: Joi.string()
    .max(50)
    .required(),
  email: Joi.string()
    .max(100)
    .email()
    .required(),
  message: Joi.string()
    .max(300)
    .required(),
});

const transporter = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN_NAME });

const handler = async (event, _, callback) => {
  try {
    let body = JSON.parse(event.body);
    body = await schema.validateAsync({ ...body });

    const MailOpt = {
      from: `Web Site <${process.env.EMAIL}>`,
      to: process.env.RECEIVER,
      subject: 'New Message!',
      html: template({ ...body, time: new Date().toUTCString() }).toString(),
    };

    transporter.messages().send(MailOpt, async (err, info) => {
      if (err) {
        logger.error({
          log: 'Error while posting Message',
          error: err,
          user_message: JSON.stringify(body),
          date: new Date().toUTCString(),
        });
        console.log({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error', err: err.message }),
        });
        await callback(null, {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error', err: err.message }),
        });
        return;
      }
      logger.info({
        log: 'Created Message',
        user_message: JSON.stringify(body),
        date: new Date().toUTCString(),
      });
      console.log({
        statusCode: 201,
        body: JSON.stringify({ message: 'Message was successful', info }),
      });
      await callback(null, {
        statusCode: 201,
        body: JSON.stringify({ message: 'Message was successful', info }),
      });
    });
  } catch (error) {
    if (error.message.match('valid')) {
      logger.error({
        log: 'Error while validating user inputs',
        error,
        date: new Date().toUTCString(),
      });
      await callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: 'User  Error', error: error.message }),
      });
    }
    logger.error({
      log: 'Unexpected Internal Server Error',
      error,
      user_message: JSON.stringify(error),
      date: new Date().toUTCString(),
    });
    console.log({ statusCode: 500, body: error.toString() });
    await callback(null, { statusCode: 500, body: error.toString() });
  }
  return { statusCode: 200, body: JSON.stringify({ message: 'Your Message is Send!' }) };
};

module.exports = { handler };
