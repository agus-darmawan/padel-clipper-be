import { env } from '@config/env.js';
import pino, { type Logger } from 'pino';

const isDevelopment = env.app.env === 'development';

const pinoLogger = pino({
  level: isDevelopment ? 'debug' : 'info',
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
});

type LogArg = string | number | boolean | object | null | undefined | Error;

interface MultiArgLogger {
  trace: (...args: LogArg[]) => void;
  debug: (...args: LogArg[]) => void;
  info: (...args: LogArg[]) => void;
  warn: (...args: LogArg[]) => void;
  error: (...args: LogArg[]) => void;
  fatal: (...args: LogArg[]) => void;
  child: Logger['child'];
  level: Logger['level'];
  silent: Logger['silent'];
}

// Wrapper function untuk mendukung multiple arguments
const createLoggerWithMultiArgs = (baseLogger: Logger): MultiArgLogger => {
  const formatArgs = (...args: LogArg[]): string => {
    if (args.length === 1) {
      const arg = args[0];
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return arg.message;
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, null, 2);
      }
      return String(arg);
    }

    const [firstArg, ...restArgs] = args;
    const formattedFirst =
      typeof firstArg === 'string' ? firstArg : String(firstArg);
    const formattedRest = restArgs
      .map((arg) => {
        if (arg instanceof Error) {
          return `\n${arg.stack || arg.message}`;
        }
        if (typeof arg === 'object' && arg !== null) {
          return `\n${JSON.stringify(arg, null, 2)}`;
        }
        return String(arg);
      })
      .join(' ');

    return `${formattedFirst} ${formattedRest}`;
  };

  return {
    trace: (...args: LogArg[]) => baseLogger.trace(formatArgs(...args)),
    debug: (...args: LogArg[]) => baseLogger.debug(formatArgs(...args)),
    info: (...args: LogArg[]) => baseLogger.info(formatArgs(...args)),
    warn: (...args: LogArg[]) => baseLogger.warn(formatArgs(...args)),
    error: (...args: LogArg[]) => baseLogger.error(formatArgs(...args)),
    fatal: (...args: LogArg[]) => baseLogger.fatal(formatArgs(...args)),
    // Preserve original pino methods
    child: baseLogger.child.bind(baseLogger),
    level: baseLogger.level,
    silent: baseLogger.silent.bind(baseLogger),
  };
};

const logger = createLoggerWithMultiArgs(pinoLogger);

export default logger;
