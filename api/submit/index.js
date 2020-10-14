require('dotenv').config();

const Joi = require('joi');
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const winston = require('winston');

const html =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body style=" font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif; min-height: 100vh; margin: 0; padding: 0; " ><h1 align="center">New Message from Website</h1><table style=" padding: 10px 20px; background-color: antiquewhite; border-radius: 10px; width: 400px; margin: 0 auto; " ><tr style="text-align: left"><th style="padding-right: 10px">Name:</th><td>{{name}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Email:</th><td>{{email}}</td></tr><tr style="text-align: left"><th style="padding-right: 10px">Message:</th><td>{{message}}</td></tr></table><h3 style="text-align: center; margin-top: 20px">Time: {{time}}</h3></body></html>';

const template = Handlebars.compile(html);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service ' },
  transports: [new winston.transports.File({ filename: 'main_log.log' })],
});

const schema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().max(100).email().required(),
  message: Joi.string().max(300).required(),
});

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  host: 'smtp.mailgun.org',
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

module.exports = async (req, res) => {
  try {
    let body = JSON.parse(req.body);
    body = await schema.validateAsync({ ...body });
    const MailOpt = {
      from: `Web Site <${process.env.EMAIL}>`,
      to: process.env.RECEIVER,
      subject: 'New Message!',
      html: template({ ...body, time: new Date().toUTCString() }).toString(),
    };
    transporter.sendMail(MailOpt, (err, info) => {
      if (err) {
        logger.error({
          log: 'Error while posting Message',
          error: err,
          user_message: JSON.stringify(body),
          date: new Date().toUTCString(),
        });
        res.status(500).send({ message: 'Error', error: err });
      } else {
        logger.info({
          log: 'Created Message',
          user_message: JSON.stringify(body),
          date: new Date().toUTCString(),
        });
        res
          .status(201)
          .send({ message: 'Message was successful', info: info.response });
      }
    });
  } catch (err) {
    if (err.message.match('valid')) {
      logger.error({
        log: 'Error while validating user inputs',
        error: err,
        date: new Date().toUTCString(),
      });
      res.status(400).send({ message: 'User  Error', error: err.message });
      return;
    }
    logger.error({
      log: 'Unexpected Internal Server Error',
      error: err,
      user_message: JSON.stringify(err),
      date: new Date().toUTCString(),
    });
    res.status(500).send({ message: 'Error', err: err.message });
  }
};
