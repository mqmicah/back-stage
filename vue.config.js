const path = require('path');

module.exports = {
    devServer: {
        open: true
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('cp', path.resolve(__dirname, './src/components'))
            .set('as', path.resolve(__dirname, './src/assets'))
            .set('page', path.resolve(__dirname, './src/views'))
    }
}