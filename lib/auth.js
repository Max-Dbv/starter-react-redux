'use strict';

const hapi = require('hapi');

const NODE_ENV = process.env.NODE_ENV || 'development';
const CONFIG = {
  server: require('../config')
};

exports.register = (server, options, next) => {

  server.register(require('hapi-auth-cookie'), err => {
    if (err) {
      throw err;
    }

    let opt = {
      password: 'xxx', // Secret password
      cookie: 'app-starter', // Cookie name
      isSecure: false, // Required for non-https applications
      ttl: 30 * 24 * 60 * 60 * 1000, // Set session to 30 days
      redirectTo: CONFIG.server[NODE_ENV].website + '/login',
      domain: CONFIG.server[NODE_ENV].domain
    };

    server.auth.strategy('standard', 'cookie', opt);
  });

  next();
}

exports.register.attributes = {
  name: 'auth'
};
