import app from './app';
import config from './config/index';
import mongoose from 'mongoose';
import { Server } from 'http';

process.on('uncaughtException', err => {
  console.log('uncaughtException error');
  console.log(err);
  // errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_rul as string);
    console.log('connect to mongoose');
    // infoLogger.info('connect to mongoose');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('failed to connect ', err);
    // errorLogger.error('failed to connect ', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        // errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
