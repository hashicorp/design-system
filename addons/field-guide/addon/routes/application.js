/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';

export default Route.extend({
  model() {
    return fetch(`${config.rootURL}toc.json`)
      .then(res => res.json())
  }
})
