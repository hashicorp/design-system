/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import FastBootService from 'ember-cli-fastboot/services/fastboot';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const COOKIE_NAME = 'hide-banner';

interface DocPageBannerSignature {
  Args: {
    icon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocPageBanner extends Component<DocPageBannerSignature> {
  @tracked isVisible = !this.isDismissed;
  @service declare readonly fastboot: FastBootService;

  get isDismissed() {
    let hasCookie = false;
    if (!this.fastboot.isFastBoot) {
      hasCookie =
        document.cookie
          .split('; ')
          .findIndex((cookie) => cookie.startsWith(COOKIE_NAME)) >= 0;
    }
    return hasCookie;
  }

  onClose = () => {
    this.isVisible = false;
    if (!this.fastboot.isFastBoot) {
      // we let it expire in two days (we want more impressions over two week's time)
      document.cookie = `${COOKIE_NAME}=true; max-age=${60 * 60 * 24 * 2};`;
    }
  };

  <template>
    {{#if this.isVisible}}
      <div class="doc-page-banner" ...attributes>
        {{#if @icon}}
          <HdsIcon @name={{@icon}} @size="24" class="doc-page-banner__icon" />
        {{/if}}
        <div class="doc-page-banner__text doc-text-body">{{yield}}</div>
        <button
          type="button"
          class="doc-page-banner__close"
          aria-label="Close banner"
          {{on "click" this.onClose}}
        >
          <HdsIcon @name="x" @size="16" />
        </button>
      </div>
    {{/if}}
  </template>
}
