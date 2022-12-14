import dotEnv from 'dotenv';
import { ConfigurationOptions } from './configurationOptions';

if (process.env.NODE_ENV === 'test') {
  dotEnv.config({ path: '../../.env.test' });
}
dotEnv.config();

const configuration: ConfigurationOptions = {
  application: {
    http: {
      port: +process.env.APP_HTTP_PORT || 3000
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_LIFE_TIME
    }
  },
  mongodb: {
    auth: process.env.MONGODB_PASSWORD && process.env.MONGODB_USER ? true : false,
    port: +process.env.MONGODB_PORT || 27017,
    user: process.env.MONwGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    host: process.env.MONGODB_HOST || 'localhost'
  },
  redis: {
    auth: process.env.REDIS_USER && process.env.REDIS_PASSWORD && process.env.REDIS_DATABASE ? true : false,
    user: process.env.REDIS_USER,
    port: +process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE || 'app',
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST || '127.0.0.1',
    expireTime: +process.env.REDIS_KEY_EXPIRE_TIME || 604800
  },
  services: {
    playmobile: {
      token: process.env.PLAYMOBILE_SMS_AUTH_TOKEN || '',
      host: process.env.PLAYMOBILE_SMS_HOST || ''
    }
  }
};
export default configuration;
