import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set log file path
const logFile = path.join(__dirname, '../logs/requests.log');

// Define the middleware function
const customLogger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  fs.appendFile(logFile, log, (err) => {
    if (err) throw err;
  });
  next();
};

// ✅ Export using ES module default export
export default customLogger;
