import Route from '@ember/routing/route';
import fetch from 'fetch';
import {
  isAbortError,
  isServerErrorResponse,
  isUnauthorizedResponse,
  isNotFoundResponse,
} from 'ember-fetch/errors';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

export default class ShowRoute extends Route {
  @service router;

  model(params) {
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');

    // redirect if `index` is added to the URL
    if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // get the page data from the "flat" toc we need it to get the "filePath"
    // which is not necessarily the same as the URL path (eg. we remove the "index" from the URL)
    const toc = this.modelFor('application').toc;
    const pageData = toc.flat.find((page) => page.pageURL === path);

    return fetch(`${config.rootURL}docs/${pageData.filePath}.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (isUnauthorizedResponse(res)) {
          // handle 401 response
          console.log(
            `fetch "${config.rootURL}docs/${path}.json" → isUnauthorizedResponse (401)`,
            res
          );
        } else if (isNotFoundResponse(res)) {
          // handle 404 response
          console.log(
            `fetch "${config.rootURL}docs/${path}.json" → isNotFoundResponse (404)`,
            res
          );
        } else if (isServerErrorResponse(res)) {
          // handle 5xx response
          console.log(
            `fetch "${config.rootURL}docs/${path}.json" → isServerErrorResponse (5xx)`,
            res
          );
        }
      })
      .catch((error) => {
        if (isAbortError(error)) {
          // handle aborted network error
          console.log(
            `fetch "${config.rootURL}docs/${path}.json" → isAbortError`,
            error
          );
        } else {
          console.log(
            `fetch "${config.rootURL}docs/${path}.json" → error`,
            error
          );
        }
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
          'layout',
          'title',
          'description',
          'caption',
          'status',
          'layout',
        ];
        frontmatterAttributes.forEach((attribute) => {
          if (attribute in res.data.attributes) {
            frontmatter[attribute] = res.data.attributes[attribute];
            delete res.data.attributes[attribute];
          }
        });

        // check if there are special needs for the page layout
        const hasCover = frontmatter?.layout?.cover ?? true;
        // TODO! probably we should also check if we have TOC data for the sidecar
        const hasSidecar = frontmatter?.layout?.sidecar ?? true;

        return {
          id: res.data.id,
          ...res.data.attributes,
          frontmatter,
          hasCover,
          hasSidecar,
        };
      });
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
