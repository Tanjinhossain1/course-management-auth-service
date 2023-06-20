'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('./app'));
const index_1 = __importDefault(require('./config/index'));
const mongoose_1 = __importDefault(require('mongoose'));
process.on('uncaughtException', err => {
  console.log('uncaughtException error');
  console.log(err);
  // errorLogger.error(err);
  process.exit(1);
});
let server;
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(index_1.default.database_rul);
      console.log('connect to mongoose');
      // infoLogger.info('connect to mongoose');
      server = app_1.default.listen(index_1.default.port, () => {
        console.log(`Example app listening on port ${index_1.default.port}`);
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
  });
}
main();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
