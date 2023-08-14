/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const COOKIE_NAME = 'hide-banner';

export default class DocPageBannerComponent extends Component {
  @tracked isVisible = !this.isDismissed;

  get isDismissed() {
    const hasCookie =
      document.cookie
        .split('; ')
        .findIndex((cookie) => cookie.startsWith(COOKIE_NAME)) >= 0;
    return hasCookie;
  }

  @action
  onClose() {
    this.isVisible = false;
    // we let it expire in two days (we want more impressions over two week's time)
    document.cookie = `${COOKIE_NAME}=true; max-age=${60 * 60 * 24 * 2};`;
  }
}
