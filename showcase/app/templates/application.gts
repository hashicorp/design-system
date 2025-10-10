/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import { modifier } from 'ember-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwLogoDesignSystem from 'showcase/components/shw/logo/design-system';

export default class Application extends Component {
  @service declare readonly router: RouterService;

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  addMockStateClasses = modifier(() => {
    document.querySelectorAll('[mock-state-value]').forEach((element) => {
      let targets;
      const mockStateSelector = element.getAttribute('mock-state-selector');
      if (mockStateSelector) {
        targets = element.querySelectorAll(mockStateSelector);
      } else {
        targets = [element];
      }
      const states = element.getAttribute('mock-state-value')!.split('+');
      const classes = states.map((state) => `mock-${state.trim()}`);
      targets.forEach((target) => {
        target.classList.add(...classes);
      });
    });
  });

  <template>
    {{pageTitle "HDS Showcase"}}

    {{#if this.isFrameless}}
      {{outlet}}
    {{else}}
      <header class="shw-page-header">
        <LinkTo
          @route="index"
          class="shw-page-header__logo"
          aria-label="home page"
        >
          <ShwLogoDesignSystem />
        </LinkTo>
        <div class="shw-page-header__title">Components showcase</div>
      </header>

      <aside class="shw-page-aside">
        <LinkTo class="shw-back-to-components-list" @route="index">
          <HdsIcon @name="arrow-left" />
          Component list
        </LinkTo>
      </aside>

      <main id="main" class="shw-page-main" {{this.addMockStateClasses}}>
        {{outlet}}
      </main>
    {{/if}}
  </template>
}
