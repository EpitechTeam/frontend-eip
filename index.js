require('ignore-styles')
require('@babel/polyfill')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins : ["transform-es2015-modules-commonjs"]
})

require('./server')