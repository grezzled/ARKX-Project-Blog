module.exports = {
    port: process.env.PORT || 7500,
    staticFolderPath: '/public',
    helmetOptions: {},
    compressionEnabled: true,
    morganFormat: 'combined',
    viewEngine: 'ejs',
    notFoundTemplate: '404'
}