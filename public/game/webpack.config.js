var path = require('path');

module.exports = {
    entry: "./src/script.ts",
    output: {
        filename: "./bundle.js"
    },
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: "source-map-loader"}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}