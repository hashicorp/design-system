/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';

export default Route.extend({
  model() {
    // TODO add fetch error handling similar to `website/app/routes/show.js`
    // potentially we may even want to abstract it away in a shared "util" file/method
    return fetch(`${config.rootURL}toc.json`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // we group the TOC under a specific "key", instead of spreading the content all over the model
      return { toc: res }
    });
  },
})
