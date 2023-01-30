'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'website',
    environment,
    rootURL: '/',
    locationType: 'history',
    historySupportMiddleware: true,
    routerScroll: {
      targetElement: '#topofpage',
      scrollWhenAfterRender: true,
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/],
    },

    'ember-meta': {
      description:
        'The Helios Design System from HashiCorp provides the open source building blocks to design and implement consistent, accessible, and delightful product experiences.',
      siteName: 'Helios Design System',
      title: 'Helios Design System',
      url: 'https://helios.hashicorp.design',
      twitterUsername: '@HashiCorp',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
