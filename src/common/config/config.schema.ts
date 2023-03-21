import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  DB_HOST: {
    doc: 'IP adress of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});
