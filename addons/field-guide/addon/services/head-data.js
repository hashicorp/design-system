/* eslint-disable ember/no-computed-properties-in-native-classes, prettier/prettier */
import HeadDataService from 'ember-meta/services/head-data';
import { computed } from '@ember/object';
import config from 'ember-get-config';
import innertext from 'innertext';

import { getExcerpt, stripHTML } from 'ember-html-excerpt/helpers/excerpt';

export default class CustomHeadDataService extends HeadDataService {
  get config() {
    return config['field-guide'];
  }

  @computed('config.{name,tagLine}', 'currentRouteMeta.title')
  get title() {
    // TODO add the current page's title here once we properly add it to metadata
    return this.currentRouteMeta?.title ?? `${this.config.name} - ${this.config.tagLine ?? 'Field Guide'}`;
  }

  // this is different from title() because it's not supposed to include the
  // current routes information
  @computed('config.{name,tagLine}', 'currentRouteMeta.title')
  get siteName() {
    return this.currentRouteMeta?.title ?? `${this.config.name} - ${this.config.tagLine ?? 'Field Guide'}`;
  }

  get content() {
    return innertext(this.currentRouteMeta.html);
  }

  @computed('currentRouteMeta')
  get description() {
    let currentModel = this.currentRouteMeta;

    if(currentModel && currentModel.html) {
      const excerpt = getExcerpt(currentModel.html, {
        words: 33
      })

      return `${excerpt}${excerpt.length !== stripHTML(currentModel.html).length ? '...' : ''}`;
    }

    // we should always expect to have a currentModel so this will never be hit
    return null;
  }

  get normalisedHost() {
    // we remove any trailing / from the host and add it back in to make sure
    // that we always have a consistent URL
    return this.config.host?.replace(/\/$/, '');
  }

  @computed('config.logo', 'normalisedHost')
  get imgSrc() {
    return `${this.normalisedHost ?? ''}/${this.config.logo?.replace(/^\//, '')}`;
  }

  @computed('normalisedHost', 'router.currentURL')
  get url() {
    // url is only ever valid if you have a host
    if(!this.normalisedHost) {
      return null;
    }

    const normalisedUrl = this.router.currentURL.replace(/\/$/, '');

    return `${this.normalisedHost}${normalisedUrl}/`;
  }
}
