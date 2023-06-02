import { createLogger, format, transports } from 'winston'
import path from 'path'

const { printf, combine, label, timestamp, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()}:${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

export const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'TH' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'TH' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})
