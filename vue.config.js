const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: process.env.PROJECT_DIRECTION_PATH,
    devServer: {
        proxy: {
            '/swapi/api/': {
                target: 'http://localhost:8088',
                secure: false,
                logLevel: 'debug',
                changeOrigin: true
            }
        }
    },
    runtimeCompiler: true
})
