const Joi = require('joi');
const mailgun = require('mailgun-js');

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .min(1)
    .max(100)
    .required(),
  message: Joi.string()
    .min(1)
    .max(300)
    .required(),
});

async function sendEmail(data) {
  return new Promise((resolve, reject) => {
    const mg = mailgun({ domain: process.env.API_DOMAIN, apiKey: process.env.API_KEY });
    mg.messages().send(data, (err) => (err ? reject(err) : resolve()));
  });
}

module.exports.handler = async (event) => {
  // eslint-disable-next-line
  if (event.httpMethod !== 'POST')
    // eslint-disable-next-line
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'method is not allowed',
      }),
    };

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 400, msg: 'Not valid input' };
  }

  const validBody = schema.validate(body);
  if (validBody.error) return { statusCode: 400, body: JSON.stringify({ error: validBody.error }) };
  // eslint-disable-next-line
  if (validBody.warning)
    // eslint-disable-next-line
    return {
      statusCode: 400,
      body: JSON.stringify({
        warning: validBody.warning,
      }),
    };

  await sendEmail({
    to: 'bogdankostyuk12@gmail.com',
    text: validBody.value.message,
    subject: 'New form submission',
    from: `server@${process.env.API_DOMAIN}`,
    template: 'from-my-website',
    'h:X-Mailgun-Variables': JSON.stringify({
      name: validBody.value.name,
      email: validBody.value.email,
      message: validBody.value.message,
    }),
  }).catch((err) => console.log({ err, msg: 'something went wrong when sending mail' }));

  return { statusCode: 200, body: JSON.stringify({ msg: 'successfully sent email' }) };
};
