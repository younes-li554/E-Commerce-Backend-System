import { createLogger, format, transports } from 'winston';

// Winston Logger Configuration
export const logger = createLogger({
  level: 'info', // default logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'my-nest-app' }, // optional metadata
  transports: [
    new transports.Console(), // logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // error logs
    new transports.File({ filename: 'logs/combined.log' }), // all logs
  ],
});