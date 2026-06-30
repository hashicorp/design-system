/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import { scheduleOnce } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwLogoDesignSystem from 'showcase/components/shw/logo/design-system';

export default class Application extends Component {
  @service declare readonly router: RouterService;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
  }

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  applyMockStatesToElement = (element: Element) => {
    const mockStateSelector = element.getAttribute('mock-state-selector');
    const targets = mockStateSelector
      ? Array.from(element.querySelectorAll(mockStateSelector))
      : [element];

    const states = element.getAttribute('mock-state-value')!.split('+');
    const classes = states.map((state) => `mock-${state.trim()}`);
    targets.forEach((target) => {
      target.classList.add(...classes);
    });
  };

  addMockStateClasses = () => {
    document.querySelectorAll('[mock-state-value]').forEach((element) => {
      const mockStateDelay = Number(
        element.getAttribute('mock-state-delay') || 0,
      );

      if (mockStateDelay === 0) {
        this.applyMockStatesToElement(element);
      } else {
        setTimeout(
          () => this.applyMockStatesToElement(element),
          mockStateDelay,
        );
      }
    });
  };

  routeDidChange = () => {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.addMockStateClasses.bind(this));
  };

  initializePage = modifier(() => {
    this.addMockStateClasses();
  });

  <template>
    {{pageTitle "HDS Showcase"}}

    {{#if this.isFrameless}}
      <main {{this.initializePage}}>
        {{outlet}}
      </main>
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

      <main id="main" class="shw-page-main" {{this.initializePage}}>
        {{outlet}}
      </main>
    {{/if}}
  </template>
}
