import Component from '@glimmer/component';

// we want to limit the content of the sidebar navigation to only the links related to the current "section".
// notice: super hacky way to do it, but... it works™ !
const getTocSectionBundle = (section) => {
  const ABOUT = ['about', 'getting-started', 'updates'];
  const FOUNDATIONS = ['foundations'];
  const COMPONENTS = ['components', 'overrides', 'utilities'];
  const PATTERNS = ['patterns'];
  const SUPPORT = ['support'];
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
  } else if (SUPPORT.includes(section)) {
    return SUPPORT;
  } else {
    // eg. the website "root" index page
    return [];
  }
};

export default class DocPageSidebarComponent extends Component {
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
      let subTree = this.args.toc.tree[section];
      // this check avoids that we show in the sidebar empty "containers"
      if (subTree) {
        subSectionTree[section] = subTree;
      }
    });

    return Object.keys(subSectionTree).length > 0 ? subSectionTree : false;
  }

  get classNames() {
    let classes = ['doc-page-sidebar'];

    // add a class based on the @showSidebarOnSmallViewport argument
    if (this.args.showSidebarOnSmallViewport) {
      classes.push(`doc-page-sidebar--show-sidebar-on-small-viewport`);
    }

    return classes.join(' ');
  }
}
