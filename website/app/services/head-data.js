/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HeadDataService from 'ember-meta/services/head-data';
import config from 'ember-get-config';

export default class CustomHeadDataService extends HeadDataService {
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
}
