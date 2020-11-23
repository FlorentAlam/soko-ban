const path = require('path')

module.exports = {
    entry: {
        main: "./src/script.ts"
    },
    output: {
        filename: "./bundle.js"
    },
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
};