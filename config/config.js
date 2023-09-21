module.exports = {
    server: {
      PORT: process.env.PORT || 5000, 
      hostname: 'localhost', 
    },
  
    database: {
      uri: process.env.MONGODB_URI, 
      options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    },
    viewEngine: {
      engine: 'ejs', 
    },
    color:{
        green:"\x1b[32m",
        red:"\x1b[31m",
    },
    notFoundTemplate: '404',
    maxUploadSize: '10mb', 
    sessionSecret: process.env.SESSION_SECRET || 'your-secret-key', 
    production:{
      
    }
  };