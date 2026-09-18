export const logger = {
  info: (...args) => {
    console.log(`[\x1b[36mINFO\x1b[0m] [${new Date().toISOString()}]`, ...args);
  },
  success: (...args) => {
    console.log(`[\x1b[32mSUCCESS\x1b[0m] [${new Date().toISOString()}]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[\x1b[33mWARN\x1b[0m] [${new Date().toISOString()}]`, ...args);
  },
  error: (...args) => {
    console.error(`[\x1b[31mERROR\x1b[0m] [${new Date().toISOString()}]`, ...args);
  },
};

export default logger;
