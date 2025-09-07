const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.sub || 'anonymous'
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${logEntry.method} ${logEntry.url} ${logEntry.status} ${logEntry.duration}`);
    }
    
    // Log to file in production
    if (process.env.NODE_ENV === 'production') {
      const logFile = path.join(logsDir, `access-${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
  });
  
  next();
};

module.exports = logger;

// middleware/index.js
