import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const DEBOUNCE_MS = 250;

// we want to limit the content of the sidebar navigation to only the links related to the current "section".
// notice: super hacky way to do it, but... it works™ !
const getTocSectionBundle = (section) => {
  const ABOUT = ['about', 'getting-started', 'updates'];
  const FOUNDATIONS = ['foundations', 'icons'];
  const COMPONENTS = ['components', 'overrides', 'utilities'];
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

const filterSubTree = (subTree, filterQuery) => {
  let filteredTree = {};
  Object.keys(subTree).forEach((key) => {
    const item = subTree[key];
    if (item.pageURL) {
      const fq = filterQuery.toLowerCase();
      if (
        (item.pageAttributes.title &&
          item.pageAttributes.title.toLowerCase().includes(fq)) ||
        (item.pageAttributes.keywords &&
          item.pageAttributes.keywords.some((k) =>
            k.toLowerCase().includes(fq)
          ))
      ) {
        filteredTree[key] = item;
      }
    } else {
      const subSubTree = filterSubTree(item, filterQuery);
      if (Object.keys(subSubTree).length > 0) {
        filteredTree[key] = subSubTree;
      }
    }
  });
  return filteredTree;
};

export default class DocPageSidebarComponent extends Component {
  @tracked filterQuery = '';

  get isFiltered() {
    return this.filterQuery !== '';
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
    getTocSectionBundle(currentSection).forEach((section) => {
      let subTree = {};
      if (this.isFiltered) {
        subTree = filterSubTree(this.args.toc.tree[section], this.filterQuery);
      } else {
        subTree = this.args.toc.tree[section];
      }
      // this check avoids that we show in the sidebar empty "containers"
      if (Object.keys(subTree).length > 0) {
        subSectionTree[section] = subTree;
      }
    });

    return Object.keys(subSectionTree).length > 0 ? subSectionTree : false;
  }

  @restartableTask *filterPageTree(filterQuery) {
    yield timeout(DEBOUNCE_MS);

    this.filterQuery = filterQuery;
  }
}
