/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type FastbootService from 'ember-cli-fastboot/services/fastboot';
import type Owner from '@ember/owner';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import docTrackEvent from 'website/modifiers/doc-track-event';

export default class DocScrollToTopComponent extends Component {
  @service declare fastboot: FastbootService;
  @tracked isVisible = false;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);
    if (!this.fastboot.isFastBoot) {
      this.addScrollListener();
    }
  }

  willDestroy() {
    super.willDestroy();
    if (!this.fastboot.isFastBoot) {
      this.removeScrollListener();
    }
  }

  checkScroll = () => {
    this.isVisible = window.scrollY > 200;
  };

  addScrollListener = () => {
    window.addEventListener('scroll', this.checkScroll);
  };

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.checkScroll);
  };

  <template>
    <a
      href="#main"
      aria-label="Scroll back to top"
      class="doc-scroll-to-top
        {{if this.isVisible 'doc-scroll-to-top--is-visible'}}"
      tabindex={{if this.isVisible 0 -1}}
      {{docTrackEvent eventName="Navigation - Scroll to Top"}}
    >
      <HdsIcon @name="arrow-up" @color="white" @size="24" />
    </a>
  </template>
}
