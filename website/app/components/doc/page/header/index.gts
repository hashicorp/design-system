/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { NavigationNarrator } from 'ember-a11y-refocus';
import type { NavigationNarratorSignature } from 'ember-a11y-refocus/components/navigation-narrator';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import DocLogoDesignSystem from 'website/components/doc/logo/design-system';
import DocPageHeaderNavItem from 'website/components/doc/page/header/nav-item';
import DocPageHeaderAlgoliaSearch from 'website/components/doc/page/header/algolia-search';

interface DocPageHeaderSignature {
  Args: {
    isSidebarVisibleOnSmallViewport: boolean;
    onToggleBurgerMenu: () => void;
    routeChangeValidator: NavigationNarratorSignature['Args']['routeChangeValidator'];
    currentTopRoute: string;
  };
  Element: HTMLElement;
}

const DocPageHeader: TemplateOnlyComponent<DocPageHeaderSignature> = <template>
  <header class="doc-page-header" ...attributes>
    <NavigationNarrator @routeChangeValidator={{@routeChangeValidator}} />
    <LinkTo @route="index" class="doc-page-header__logo" aria-label="home page">
      <DocLogoDesignSystem />
    </LinkTo>
    <nav
      class="doc-page-header__nav-menu"
      aria-label="primary navigation"
      id="primary-navigation"
    >
      <ul role="list" aria-labelledby="primary-navigation">
        <DocPageHeaderNavItem
          @label="About"
          @route="about"
          @currentTopRoute={{@currentTopRoute}}
        />
        <DocPageHeaderNavItem
          @label="Foundations"
          @route="foundations"
          @currentTopRoute={{@currentTopRoute}}
        />
        <DocPageHeaderNavItem
          @label="Content"
          @route="content"
          @currentTopRoute={{@currentTopRoute}}
        />
        <DocPageHeaderNavItem
          @label="Components"
          @route="components"
          @currentTopRoute={{@currentTopRoute}}
        />
        <DocPageHeaderNavItem
          @label="Patterns"
          @route="patterns"
          @currentTopRoute={{@currentTopRoute}}
        />
        <li
          class="doc-page-header__nav-item-generic doc-page-header__nav-item--split"
        >
          <div class="sr-only" id="search-button-help">
            This button opens a dialog containing an input field and some
            additional information that you may wish to explore. An automatic
            search will be performed as you type text into the search field, but
            the results may not be announced. Exploring the additional items in
            the modal will help you discover the search results.
          </div>
          <button
            type="button"
            class="doc-page-header__desktop-icon-item"
            data-doc-algolia-search-autocomplete-secondary-trigger
            aria-describedby="search-button-help"
            aria-label="Search"
            id="search-button"
          >
            <HdsIcon @name="search" @size="24" />
          </button>
        </li>
        <li class="doc-page-header__nav-item-generic">
          <LinkTo
            class="doc-page-header__desktop-icon-item"
            @route="show"
            @model="about/support"
            aria-label="Support"
          >
            <HdsIcon @name="help" @size="24" />
          </LinkTo>
        </li>
        <li class="doc-page-header__nav-item-generic">
          <a
            href="https://github.com/hashicorp/design-system"
            target="_blank"
            rel="noopener noreferrer"
            class="doc-page-header__desktop-icon-item"
            aria-label="GitHub"
          >
            <HdsIcon @name="github" @size="24" />
          </a>
        </li>
      </ul>
    </nav>
    <div class="doc-page-header__mobile-only-menu">
      <button
        type="button"
        class="doc-page-header__mobile-only-menu-button"
        data-doc-algolia-search-autocomplete-secondary-trigger
        aria-describedby="search-button"
        aria-label="Search"
      >
        <HdsIcon @name="search" @size="24" />
      </button>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={{if @isSidebarVisibleOnSmallViewport "true" "false"}}
        class="doc-page-header__mobile-only-menu-button"
        {{on "click" @onToggleBurgerMenu}}
      >
        {{#if @isSidebarVisibleOnSmallViewport}}
          <HdsIcon @name="x" @size="24" />
        {{else}}
          <HdsIcon @name="menu" @size="24" />
        {{/if}}
      </button>
    </div>
    {{! ALGOLIA SEARCH }}
    <DocPageHeaderAlgoliaSearch />
  </header>
</template>;

export default DocPageHeader;
