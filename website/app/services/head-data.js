/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HeadDataService from 'ember-meta/services/head-data';
import { service } from '@ember/service';

import config from 'website/config/environment';

export default class CustomHeadDataService extends HeadDataService {
  @service router;

  get title() {
    return (
      this.currentRouteMeta?.title ??
      this.currentRouteMeta?.frontmatter?.title ??
      config['ember-meta'].title
    );
  }

  get description() {
    return (
      this.currentRouteMeta?.frontmatter?.description ??
      config['ember-meta'].description
    );
  }

  get imgSrc() {
    const previewImage = this.currentRouteMeta?.frontmatter?.previewImage
      ? this.currentRouteMeta.frontmatter.previewImage
      : 'assets/logos/share-card.jpg';
    return `${config['ember-meta'].url}/${previewImage}`;
  }

  get url() {
    const url =
      this.router.currentURL === '/'
        ? config['ember-meta'].url
        : `${config['ember-meta'].url}/${this.router.currentURL}`;
    return url;
  }
}
