import app from './app';
import config from './config/index';
import mongoose from 'mongoose';
import { errorLogger, infoLogger } from './shareble/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
  console.log('uncaughtException error');
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_rul as string);
    infoLogger.info('connect to mongoose');

    server = app.listen(config.port, () => {
      infoLogger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('failed to connect ', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
