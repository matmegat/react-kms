require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
    mainDomain: 'local.com',
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net',
  },
  production: {
    isProduction: true,
    mainDomain: 'knexpert.quotient.net',
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net',
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'KNExpert',
    description: 'KNExpert',
    head: {
      titleTemplate: 'KNExpert | %s',
      meta: [
        {name: 'KNExpert', content: 'KNExpert'},
        {name: 'keywords', content: 'KNExpert, Courses, Lessons, Questions, Answers, knowledge'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'KNExpert'},
        {property: 'og:image', content: 'http://knexpert.quotient.net/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'KNExpert'},
        {property: 'og:description', content: 'Share knowledge'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
