import morgan from 'morgan';
import morganJson from 'morgan-json';
import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

export const consoleLogger = morgan('combined');

export let esLogger;

try {
  const esClient = new Client({
    node: 'https://es01:9200',
    auth: {
      username: 'elastic',
      password: process.env.ELASTIC_PASSWORD || 'changeme',
    },
    tls: {
      ca: fs.readFileSync('/usr/share/elasticsearch/config/certs/ca/ca.crt'),
      rejectUnauthorized: false,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  esLogger = morgan(
    morganJson({
      method: ':method',
      url: ':url',
      status: ':status',
      responseTime: ':response-time',
      length: ':res[content-length]',
    }),
    {
      stream: {
        write: (message: string) => {
          esClient.index({
            index: 'logs',
            body: JSON.parse(message),
          });
        },
      },
    }
  );
} catch {
  esLogger = undefined;
}
