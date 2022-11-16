import Component from '@glimmer/component';

// super hacky way to do what we need, but is a stepping stone (things will be done properly in https://hashicorp.atlassian.net/browse/HDS-1059)
const getTocBundle = (section) => {
  const ABOUT = ['about', 'overview', 'getting-started', 'updates'];
  const FOUNDATIONS = ['foundations'];
  const COMPONENTS = ['components', 'overrides', 'utilities'];
  const PATTERNS = ['patterns'];
  // This will be removed later
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
    console.log(`ERROR (getTocBundle): section not found for '${section}'`);
    return [];
  }
};

export default class DocPageSidebarComponent extends Component {
  //
  // this is a temporary function used to emulate the functionality
  // that limits the content of the sidebar navigation to only the links
  // related to the current "section".
  //
  // notice: it makes a lot of assumptions, and is not perfect but as
  // initial way to test the information architecture and navigation does the trick
  //
  // we will implement a proper TOC generation and navigation once we will make a call
  // on the tool/infrastructure to use for the website
  //
  get navigationTree() {
    const { currentPath, currentRoute } = this.args;

    // eg. currentPath = 'about'
    // console.log('sidebar >>> currentPath', currentPath);

    // eg. currentRoute = {
    //      name: 'about',
    //      parent: {
    //        name: 'application',
    //        parent: null,
    //        ...
    //      },
    //      localName: 'about',
    //      attributes: [
    //        { id: 'components', title: 'components', pages: [Array] },
    //        { id: 'content', title: 'content', pages: [Array] },
    //        { id: 'foundations', title: 'foundations', pages: [Array] },
    //        { id: 'getting-started', title: 'getting-started', pages: [Array] },
    //        { id: 'overrides', title: 'overrides', pages: [Array] },
    //        { id: 'overview', title: 'overview', pages: [Array] },
    //        { id: 'testing', title: 'testing', pages: [Array] },
    //        { id: 'updates', title: 'updates', pages: [Array] },
    //        { id: 'utilities', title: 'utilities', pages: [Array] }
    //      ]
    //   }
    // console.log('sidebar >>> currentRoute', currentRoute);

    let section;
    if (currentRoute.localName === 'show') {
      // eg. "foundations/tokens/03--how-to-use/"
      section = currentRoute.params.path.split('/')[0];
    } else if (currentPath) {
      // eg. "foundations/"
      section = currentPath;
    }

    const currentPageTocs = this.sortedTocs.filter((item) => {
      return getTocBundle(item.id).includes(section);
    });

    return currentPageTocs.length > 0 ? currentPageTocs : undefined;
  }

  get sortedTocs() {
    return this.args.tocs.sort((a, b) => {
      // index at the top always
      if (a.title === 'index' && b.title !== 'index') {
        return -1;
      }

      if (b.title === 'index' && a.title !== 'index') {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
  }
}
