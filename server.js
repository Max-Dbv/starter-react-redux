'use strict';

const Hapi = require('hapi');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const CONFIG = {
  server: require('./config')
};

const server = new Hapi.Server();

server.connection({
  port: CONFIG.server[NODE_ENV].port
});

server.register([
    {register: require('./lib/auth.js')},
    {register: require('./lib/app.js')}
  ], () => {

  //Start the server
  server.start(err => {
    if (err) {
      throw err;
    }
    console.log('Dashboard available at: ', server.info.uri);
  });
});
