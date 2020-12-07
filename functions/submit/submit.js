require('dotenv').config();

const mailgun = require('mailgun-js');
const Joi = require('joi');
const Handlebars = require('handlebars');

// prettier-ignore
const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body style=" font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif; min-height: 100vh; margin: 0; padding: 0; " ><h1 align="center">New Message from Website</h1><table style=" padding: 10px 20px; background-color: antiquewhite; border-radius: 10px; width: 400px; margin: 0 auto; " ><tr style="text-align: left"><th style="padding-right: 10px">Name:</th><td>{{name}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Email:</th><td>{{email}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Message:</th><td>{{message}}</td></tr></table><h3 style="text-align: center; margin-top: 20px">Time: {{time}}</h3></body></html>';

const template = Handlebars.compile(html);

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

const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN_NAME });

// prettier-ignore
// eslint-disable-next-line func-names
exports.handler = async function (event, context, callback) {
  if (event.httpMethod !== 'POST') {
    callback(null, { statusCode: 405, body: 'Method Not Allowed' });
  }
  try {
    const body = JSON.parse(event.body);
    const data = await schema.validateAsync(body);

    const mailOpt = {
      from: `Web Site <${process.env.EMAIL}>`,
      to: process.env.RECEIVER,
      subject: 'New Message!',
      html: template({ ...data, time: new Date().toUTCString() }).toString(),
    };

    await mg.messages().send(mailOpt, (error) => {
      if (error) {
        console.log(error);
      }
    });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify('Your message is probably send!'),
    });
  } catch (error) {
    if (error.message.match('valid')) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: 'User  Error', error: error.message }),
      });
    }
    console.log('ERROR: ', error.toString());
    callback(null, { statusCode: 500, body: error.toString() });
  }
};
