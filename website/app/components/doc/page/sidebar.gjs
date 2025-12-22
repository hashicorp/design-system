/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { LinkTo } from '@ember/routing';
import { or } from 'ember-truth-helpers';

import DocFormFilter from 'website/components/doc/form/filter';
import DocTableOfContents from 'website/components/doc/table-of-contents';

const DEBOUNCE_MS = 250;

// we want to limit the content of the sidebar navigation to only the links related to the current "section".
// notice: super hacky way to do it, but... it works™ !
const getTocSectionsBundle = (section) => {
  const ABOUT = ['about', 'whats-new', 'getting-started'];
  const FOUNDATIONS = ['foundations', 'icons'];
  const COMPONENTS = ['components', 'layouts', 'overrides', 'utilities'];
  const CONTENT = ['content'];
  const PATTERNS = ['patterns'];
  // this will be removed later
  const TESTING = ['testing'];

  if (ABOUT.includes(section)) {
    return ABOUT;
  } else if (FOUNDATIONS.includes(section)) {
    return FOUNDATIONS;
  } else if (COMPONENTS.includes(section)) {
    return COMPONENTS;
  } else if (PATTERNS.includes(section)) {
    return PATTERNS;
  } else if (CONTENT.includes(section)) {
    return CONTENT;
  } else if (TESTING.includes(section)) {
    return TESTING;
  } else {
    // eg. the website "root" index page
    return [];
  }
};

const getSidebarStructuredTree = (subTree, filterQuery, currentURL) => {
  let sidebarStructuredTree = {};
  const isFiltered = filterQuery !== '';
  Object.keys(subTree).forEach((key) => {
    const item = subTree[key];
    if (item.pageURL) {
      if (!item.pageAttributes?.navigation?.hidden) {
        const fq = filterQuery.toLowerCase();
        if (isFiltered) {
          const labelMatch =
            item.pageAttributes.navigation.label &&
            item.pageAttributes.navigation.label.toLowerCase().includes(fq);
          const titleMatch =
            item.pageAttributes.title &&
            item.pageAttributes.title.toLowerCase().includes(fq);
          const keywordsMatch =
            item.pageAttributes.navigation.keywords &&
            item.pageAttributes.navigation.keywords.some((k) =>
              k.toLowerCase().includes(fq),
            );
          if (labelMatch || titleMatch || keywordsMatch) {
            sidebarStructuredTree[key] = item;
          }
        } else {
          sidebarStructuredTree[key] = item;
        }
      }
    } else {
      const subSubTree = getSidebarStructuredTree(item, filterQuery);
      if (Object.keys(subSubTree).length > 0) {
        sidebarStructuredTree[key] = {
          children: subSubTree,
          isOpen: isActiveTree(subSubTree, currentURL) || isFiltered,
        };
      }
    }
  });
  return sidebarStructuredTree;
};

const isActiveTree = (subTree, currentURL) => {
  let isActive = false;
  Object.keys(subTree).forEach((key) => {
    const item = subTree[key];
    if (item.pageURL) {
      isActive = isActive || item.pageURL === currentURL;
    } else {
      isActive = isActive || isActiveTree(item);
    }
  });
  return isActive;
};

export default class DocPageSidebarComponent extends Component {
  @service router;

  @tracked filterQuery = '';

  constructor() {
    super(...arguments);

    // used to detect changes in top-route navigation
    this._currentTopRoute = this.args.currentTopRoute;
    this.router.on('routeDidChange', this.onRouteDidChange);
  }

  get isFiltered() {
    return this.filterQuery !== '';
  }

  get hasTableOfContents() {
    return (
      this.structuredPageTree && Object.keys(this.structuredPageTree).length > 0
    );
  }

  get structuredPageTree() {
    const { currentPath, currentRoute } = this.args;

    let currentSection;
    if (currentRoute.localName === 'show') {
      // eg. "foundations/tokens/"
      currentSection = currentRoute.params.path.split('/')[0];
    } else if (currentPath) {
      // eg. "foundations/"
      currentSection = currentPath;
    }

    const subSectionTree = {};
    getTocSectionsBundle(currentSection).forEach((section) => {
      const sectionTocTree = this.args.toc.tree[section];
      // the section may exist (eg. because it has an index page) but be without children,
      // so we need to check if it has an entry in the TOC file
      if (sectionTocTree) {
        // the `getSidebarStructuredTree` function changes shape to the tree to
        // adapt it to the sidebar implementation needs (eg adding a `isOpen` to the groups)
        // and filter the items if a non-empty `filterQuery` parameter is provided
        const sidebarSubTree = getSidebarStructuredTree(
          sectionTocTree,
          this.filterQuery,
          currentRoute.params.path,
        );

        // this check avoids that we show in the sidebar empty "containers" (eg. when filtered)
        if (Object.keys(sidebarSubTree).length > 0) {
          subSectionTree[section] = sidebarSubTree;
        }
      }
    });

    // if there are no sections with non-empty subtrees, we return false
    // so the template will not show at all the "table of contents" block
    return Object.keys(subSectionTree).length > 0 ? subSectionTree : false;
  }

  @restartableTask *filterPageTree(filterQuery) {
    yield timeout(DEBOUNCE_MS);

    this.filterQuery = filterQuery.trim();
  }

  onRouteDidChange = () => {
    if (this._currentTopRoute !== this.args.currentTopRoute) {
      this.filterQuery = '';
    }
    this._currentTopRoute = this.args.currentTopRoute;
  };

  <template>
    <aside class="doc-page-sidebar" ...attributes>
      <div class="doc-page-sidebar__inner-wrapper">
        <nav
          class="doc-page-sidebar__top-routes"
          aria-label="primary page navigation"
        >
          <ul class="doc-table-of-contents">
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <div class="doc-table-of-contents__heading">Main categories</div>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="about"
              >About</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="foundations"
              >Foundations</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="content"
              >Content</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="components"
              >Components</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="patterns"
              >Patterns</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <LinkTo
                class="doc-table-of-contents__link"
                @route="show"
                @model="about/support"
              >Support</LinkTo>
            </li>
            <li
              class="doc-table-of-contents__item doc-table-of-contents__item--depth-2"
            >
              <a
                class="doc-table-of-contents__link"
                href="https://github.com/hashicorp/design-system"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
            </li>
          </ul>
        </nav>
        {{#if (or this.structuredPageTree this.isFiltered)}}
          <div class="doc-page-sidebar__filter">
            <DocFormFilter
              @isCompact={{true}}
              @filterQuery={{this.filterQuery}}
              @placeholder="Filter sidebar"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="none"
              spellcheck="false"
              @onInput={{this.filterPageTree}}
            />
          </div>
          <nav
            class="doc-page-sidebar__table-of-contents"
            aria-label="secondary page navigation"
          >
            {{#if this.hasTableOfContents}}
              <DocTableOfContents
                @structuredPageTree={{this.structuredPageTree}}
                @depth={{1}}
              />
            {{else}}
              <p class="doc-text-body-small">No results found</p>
            {{/if}}
          </nav>
        {{/if}}
      </div>
    </aside>
  </template>
}
