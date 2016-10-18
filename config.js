'use strict';

/**
 * Export server config.
 */

module.exports = {

  development: {
    port: 3000,
    website: 'http://localhost:8080',
    domain: null
  },

  production: {
    port: process.env.PORT || 3000,
    website: 'http://localhost:8080',
    domain: null
  }

};
