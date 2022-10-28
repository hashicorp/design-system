import Component from '@glimmer/component';

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

    // console.log('sidebar >>> currentPath', currentPath);
    // console.log('sidebar >>> currentRoute', currentRoute);
    // console.log('sidebar >>> sortedTocs', this.sortedTocs);

    let section;
    let currentSectionTocs;

    if (currentRoute.localName === 'show') {
      // eg. "foundations/tokens/03--how-to-use/"
      section = currentRoute.params.path.split('/')[0];
    } else if (currentPath) {
      // eg. "foundations/"
      section = currentPath;
    }

    currentSectionTocs = this.sortedTocs.filter((item) => item.id === section);

    return currentSectionTocs.length > 0 ? currentSectionTocs : undefined;
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
