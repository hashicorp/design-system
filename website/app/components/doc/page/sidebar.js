/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

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
              k.toLowerCase().includes(fq)
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
          currentRoute.params.path
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

  @action
  onRouteDidChange() {
    if (this._currentTopRoute !== this.args.currentTopRoute) {
      this.filterQuery = '';
    }
    this._currentTopRoute = this.args.currentTopRoute;
  }
}
