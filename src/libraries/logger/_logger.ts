import winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({
      all: true,
    }),
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
  ),
});

export { logger };
