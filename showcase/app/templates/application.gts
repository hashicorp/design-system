/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import type Transition from '@ember/routing/transition';
import { scheduleOnce, next } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwLogoDesignSystem from 'showcase/components/shw/logo/design-system';
import ShwThemeSwitcher from 'showcase/components/shw/theme-switcher';
import ShwThemingService from 'showcase/services/shw-theming';
import type { ShwStylesheets } from 'showcase/services/shw-theming';

import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsThemes,
  HdsModes,
} from '@hashicorp/design-system-components/services/hds-theming';

const isCarbonizationRoute = (routeName: string | null | undefined) => {
  return routeName && routeName?.match(/^page-carbonization/) ? true : false;
};

export default class Application extends Component {
  @service declare readonly router: RouterService;
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  isPreviousRouteCarbonized: boolean | undefined;
  isCurrentRouteCarbonized: boolean | undefined;
  previousStylesheet: ShwStylesheets | undefined;
  previousTheme: HdsThemes | undefined;
  previousMode: HdsModes | undefined;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
    this.hdsTheming.initializeTheme();
  }

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  get isCarbonizationPage() {
    return isCarbonizationRoute(this.router?.currentRouteName);
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

  handleStylesheetForCarbonizedPages = () => {
    // first page load (or page reload)
    if (
      this.isPreviousRouteCarbonized === undefined &&
      this.isCurrentRouteCarbonized === undefined
    ) {
      if (this.isCarbonizationPage) {
        this.shwTheming.setStylesheet('css-selectors--advanced');
        // todo set theme and mode
      }
    }
    // transitioning from a carbonized page to a non-carbonized
    if (
      this.isPreviousRouteCarbonized === true &&
      this.isCurrentRouteCarbonized === false
    ) {
      // we restore the previous stylesheet/theme/mode
      const stylesheet: ShwStylesheets =
        this.previousStylesheet ?? ('standard' as ShwStylesheets);
      this.shwTheming.setStylesheet(stylesheet);
    }
    // transitioning from a non-carbonized page to a carbonized page
    if (
      this.isPreviousRouteCarbonized === false &&
      this.isCurrentRouteCarbonized === true
    ) {
      // we save locally the previous stylesheet and update the page stylesheet/theme/mode
      this.previousStylesheet = this.shwTheming.currentStylesheet;
      this.previousTheme = this.hdsTheming.currentTheme;
      this.previousMode = this.hdsTheming.currentMode;
      this.shwTheming.setStylesheet('css-selectors--advanced');
      if (this.previousTheme === undefined && this.previousMode === undefined) {
        this.hdsTheming.setTheme({ theme: 'light' });
      }
    }
  };

  routeDidChange = (transition: Transition) => {
    this.isPreviousRouteCarbonized = isCarbonizationRoute(
      transition.from?.name,
    );
    this.isCurrentRouteCarbonized = isCarbonizationRoute(transition.to?.name);

    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.addMockStateClasses.bind(this));
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce(
      'afterRender',
      this,
      this.handleStylesheetForCarbonizedPages.bind(this),
    );
  };

  initializePage = modifier(() => {
    this.addMockStateClasses();
    // we use `next()` here to avoid clashes with the `setStylesheet` triggered by the initialization of the `shwTheming` service
    // eslint-disable-next-line ember/no-runloop
    next((): void => {
      this.handleStylesheetForCarbonizedPages();
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
        <div class="shw-page-header__theme-toggle">
          <ShwThemeSwitcher @isCarbonizationPage={{this.isCarbonizationPage}} />
        </div>
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
