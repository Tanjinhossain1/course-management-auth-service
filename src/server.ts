import app from './app'
import config from './config/index'
import mongoose from 'mongoose'
import { errorLogger, infoLogger } from './shareble/logger'

async function main() {
  try {
    await mongoose.connect(config.database_rul as string)
    infoLogger.info('connect to mongoose')

    app.listen(config.port, () => {
      infoLogger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('failed to connect ', err)
  }
}

main()
