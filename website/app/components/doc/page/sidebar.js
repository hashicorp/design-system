/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// we want to limit the content of the sidebar navigation to only the links related to the current "section".
// notice: super hacky way to do it, but... it works™ !
const getTocSectionsBundle = (section) => {
  const ABOUT = ['about', 'whats-new', 'getting-started'];
  const FOUNDATIONS = ['foundations', 'icons'];
  const COMPONENTS = ['components', 'layouts', 'overrides', 'utilities'];
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
  } else if (TESTING.includes(section)) {
    return TESTING;
  } else {
    // eg. the website "root" index page
    return [];
  }
};

const getSidebarStructuredTree = (subTree, currentURL) => {
  let sidebarStructuredTree = {};
  Object.keys(subTree).forEach((key) => {
    const item = subTree[key];
    if (item.pageURL) {
      if (!item.pageAttributes?.navigation?.hidden) {
        sidebarStructuredTree[key] = item;
      }
    } else {
      const subSubTree = getSidebarStructuredTree(item);
      if (Object.keys(subSubTree).length > 0) {
        sidebarStructuredTree[key] = {
          children: subSubTree,
          isOpen: isActiveTree(subSubTree, currentURL),
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

  constructor() {
    super(...arguments);

    // used to detect changes in top-route navigation
    this._currentTopRoute = this.args.currentTopRoute;
    this.router.on('routeDidChange', this.onRouteDidChange);
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
        const sidebarSubTree = getSidebarStructuredTree(
          sectionTocTree,
          currentRoute.params.path
        );

        // this check avoids that we show in the sidebar empty "containers"
        if (Object.keys(sidebarSubTree).length > 0) {
          subSectionTree[section] = sidebarSubTree;
        }
      }
    });

    // if there are no sections with non-empty subtrees, we return false
    // so the template will not show at all the "table of contents" block
    return Object.keys(subSectionTree).length > 0 ? subSectionTree : false;
  }

  @action
  onRouteDidChange() {
    this._currentTopRoute = this.args.currentTopRoute;
  }
}
