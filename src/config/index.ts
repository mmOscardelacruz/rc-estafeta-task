import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  db: {
    dbPort: process.env.DB_PORT ?? '5432',
    dbUser: process.env.DB_USER ?? 'root',
    dbHost: process.env.DB_HOST ?? 'localhost',
    dbPassword: process.env.DB_PASSWORD ?? '',
    dbName: process.env.DB_NAME ?? 'test',
    dbSchema: process.env.DB_SCHEMA ?? 'public',
  },
  cron: {
    cronExpression: process.env.CRON_EXPRESSION ?? '*/5 * * * * *'
  },
  geotab: {
    goAuthApiURL: process.env.GO_AUTH_API_URL ?? 'https://my.geotab.com',
    goAuthApiKey: process.env.GO_AUTH_API_KEY ?? '',
    goUsername: process.env.GO_USERNAME ?? '',
    goPassword: process.env.GO_PASSWORD ?? '',
    goDatabase: process.env.GO_DATABASE ?? '',
    goServer: process.env.GO_SERVER ?? '',
    goAddressURL: process.env.GO_URL_ADDRESS ?? '',
    goAddressKey: process.env.GO_KEY_ADDRESS ?? '',
  },
  timeZone: process.env.TIME_ZONE ?? 'America/Mexico_City',
  sendingData: {
    estafetaUrl: process.env.ESTAFETA_URL ?? '',
    estafetaUser: process.env.ESTAFETA_USER ?? '',
    estafetaPassword: process.env.ESTAFETA_PASSWORD ?? '',
  },
  sendMail: {
    mailTime: process.env.TIME_EMAILS ?? 15,
    mailService: process.env.EMAIL_SERVICE ?? 'gmail',
    mailTo: process.env.EMAIL_TO ?? '',
    mailFrom: process.env.EMAIL_METRICA ?? '',
    mailPassword: process.env.EMAILPASS_METRICA ?? '',
    mailOfsset: process.env.OFFSET ?? -6,
  }
};

export default config;