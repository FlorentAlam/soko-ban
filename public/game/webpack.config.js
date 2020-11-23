const { merge } = require('webpack-merge'); //[1]

const commonConfig = require('./webpack.common.js'); //[2]

module.exports = (env) => {
    const config = require('./webpack.' + (env.production ? 'production' : 'development') + '.js');
    return merge(commonConfig, config);
}