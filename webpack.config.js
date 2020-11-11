// const prod = process.argv.indexOf('-p') !== -1;
// console.log(prod)
const prod = process.argv[3];
if (prod === 'development') {
    module.exports = require('./webpack.developer');
} else {
    module.exports = require('./webpack.production');
}

