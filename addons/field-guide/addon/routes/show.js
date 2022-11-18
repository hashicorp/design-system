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
        return res.json();
      })
      .then((res) => {
        // want to group all the "frontmatter" attributes under the same object
        // instead of having them spread across the whole model
        // (super-hacky for now, we will find a better way later)
        const frontmatter = {};
        // NOTICE: this list for now needs to be _manually_ aligned with a similar one found in `addons/field-guide/index.js`
        const frontmatterAttributes = [
          'category',
          'group',
          'component',
          'section',
          'title',
          'description',
          'caption',
          'status',
        ];
        frontmatterAttributes.forEach((attribute) => {
          if (attribute in res.data.attributes) {
            frontmatter[attribute] = res.data.attributes[attribute];
            delete res.data.attributes[attribute];
          }
        });

        return {
          id: res.data.id,
          ...res.data.attributes,
          frontmatter,
          // TODO! TEMPORARY, FOR TESTING!
          hasCover: true,
          hasSidecar: true,
        };
      });
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
