const path = require('path');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: 'chrome',
        stats: 'errors-only',
        overlay: true,
        port: 9000
    }
};