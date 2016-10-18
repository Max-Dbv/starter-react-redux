'use strict';

const hapi = require('hapi');
const path = require('path');
const inert = require('inert');

exports.register = (server, options, next) => {

  // Serve public files.
  server.register(require('inert'), err => {

    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/{filename*}',
      config: {
        auth: null
      },
      handler: function (request, reply) {
        reply.file(path.join(__dirname, '..', 'assets', 'dist', 'index.html'), {
          confine: false
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/assets/{filename*}',
      config: {
        auth: null
      },
      handler: {
        directory: {
          path: path.join(__dirname, '..', 'assets', 'dist')
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/img/{filename*}',
      config: {
        auth: null
      },
      handler: {
        directory: {
          path: path.join(__dirname, '..', 'assets', 'img')
        }
      }
    });

  });

  next();
}

exports.register.attributes = {
  name: 'app'
};
