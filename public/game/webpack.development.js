module.exports = {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        compress: false,
        open: 'chrome',
        stats: 'errors-only',
        overlay: true,
    }
};