/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import { scheduleOnce } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwLogoDesignSystem from 'showcase/components/shw/logo/design-system';
import ShwThemeSwitcher from 'showcase/components/shw/theme-switcher';

import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

export default class Application extends Component {
  @service declare readonly router: RouterService;
  @service declare readonly hdsTheming: HdsThemingService;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
    this.hdsTheming.initializeTheme();
  }

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  get isCarbonization() {
    return this.router?.currentURL?.match(/\/carbonization\//) ? true : false;
  }

  addMockStateClasses = () => {
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
  };

  routeDidChange = () => {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.addMockStateClasses.bind(this));
  };

  handleInitialStateClasses = modifier(() => {
    this.addMockStateClasses();
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
        <div class="shw-page-header__theme-toggle">
          {{#unless this.isCarbonization}}
            {{! TODO hide the theme switcher and load the correct CSS file }}
          {{/unless}}
          <ShwThemeSwitcher />
        </div>
      </header>

      <aside class="shw-page-aside">
        <LinkTo class="shw-back-to-components-list" @route="index">
          <HdsIcon @name="arrow-left" />
          Component list
        </LinkTo>
      </aside>

      <main id="main" class="shw-page-main" {{this.handleInitialStateClasses}}>
        {{outlet}}
      </main>
    {{/if}}
  </template>
}
