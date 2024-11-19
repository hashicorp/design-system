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
import { action } from '@ember/object';
import { reject } from 'rsvp';

export default class ShowRoute extends Route {
  @service router;
  queryParams = {
    selectedTab: {
      refreshModel: true,
    },
  };

  modelCache = {};

  model(params) {
    // remove trailing slash
    const path = params.path.replace(/\/$/, '');

    // If the model is cached, return it
    if (this.modelCache[path]) {
      return this.modelCache[path];
    }

    // redirect if `index` is added to the URL
    if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // get the page data from the "flat" toc we need it to get the "filePath"
    // which is not necessarily the same as the URL path (eg. we remove the "index" from the URL)
    const toc = this.modelFor('application').toc;
    const pageData = toc.flat.find((page) => page.pageURL === path);

    if (!pageData) {
      return reject('Path not found');
    }

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
        // NOTICE: this list for now needs to be _manually_ aligned with a similar one found in `website/lib/markdown/markdown-to-jsonapi.js`
        const frontmatterAttributes = [
          'title',
          'description',
          'caption',
          'links',
          'related',
          'layout',
          'previewImage', // this is needed by the `head-data` to generate the `og:image` in the page <head>
          'navigation',
          'status',
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
        const showContentId = `show-content-${res.data.id
          .replace(/\/index$/, '')
          .replaceAll('/', '-')}`;

        // associate the "related components" urls declared in the the frontmatter
        // with the `pageAttributes` metadata for that component coming from the TOC object
        let relatedComponents = [];
        if (frontmatter.related) {
          frontmatter.related.map((relatedComponent) => {
            const relatedComponentData = toc.flat.find(
              (item) => item.pageURL === relatedComponent
            );
            if (relatedComponentData) {
              relatedComponents.push({
                ...relatedComponentData.pageAttributes,
                pageURL: relatedComponentData.pageURL,
              });
            } else {
              console.error(
                `The related component '${relatedComponent}' doesn't have a valid path in the frontmatter block of this page.`
              );
            }
          });
        }

        this.modelCache[path] = {
          // IMPORTANT: this is the "component" ID which is used to get the correct backing class for the markdown "component"
          // This ID comes from the markdown-to-json conversion (see `id: relativePath.replace(/\.md$/, '')` in `addons/field-guide/lib/markdown-to-jsonapi.js`)
          id: res.data.id, // eg. 'components/alert/index'
          ...res.data.attributes,
          // this is used to target in CSS specific content in the `show` pages
          showContentId, // eg. show-content-components-alert
          // extra metadata for this page
          frontmatter,
          hasCover,
          hasSidecar,
          relatedComponents,
        };

        return this.modelCache[path];
      });
  }

  @action
  error() {
    this.router.replaceWith('error');
  }
}
