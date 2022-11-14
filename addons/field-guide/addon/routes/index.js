/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';

export default Route.extend({
  controllerName: 'show',
  templateName: 'show',
  model() {
    return fetch(`${config.rootURL}docs/index.json`)
      .then(res => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        }
      });
  }
});
