import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

import normalisePath from '../utils/normalise-path';

export default class ShowRoute extends Route {
  @service router;

  model(params) {
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');

    if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // check if there is a path/index in the TOC
    const toc = this.modelFor('application');

    path = normalisePath(path, toc);

    return fetch(`${config.rootURL}docs/${path}.json`)
      .then((res) => {
        // console.log('res.json()', res.json());
        return res.json();
      })
      .then((res) => {
        console.log('res', res);
        return {
          id: res.data.id,
          ...res.data.attributes,
        };
      });
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
