module.exports = {
  server: {
    PORT: process.env.PORT || 5000,
    hostname: 'localhost',
  },
  api: {
    ALLOWED_FIELDS: ["userId", "username", "email", "role", "salary", "active", "inHold"],
    LIMIT: 10,
    MAX_LIMIT: 25,
    OFFSET: 1,
    SORT_BY: 'createdAt',
    SORT_DIRECTION: 'DESC'
  },
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 30000,
    }
  },
  viewEngine: {
    engine: 'ejs',
  },
  color: {
    green: "\x1b[32m",
    red: "\x1b[31m",
  },
  notFoundTemplate: '404',
  maxUploadSize: '10mb',
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key',
  production: {

  }
};