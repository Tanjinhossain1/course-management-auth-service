import app from './app'
import config from './config/index'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_rul as string)
    console.log('connect to mongoose')

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Error:', err)
  }
}

main()
