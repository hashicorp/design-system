import Controller from '@ember/controller';

export default class FoundationsController extends Controller {
  get cards() {
    // we want to use a flat tree here...
    const tocTree = this.model.toc.flat;
    const sections = ['foundations'];
    const cards = {};
    sections.forEach((section) => {
      cards[section] = tocTree
        .filter((page) => page.pageParents[0] === section)
        .map((page) => {
          return {
            image: `https://picsum.photos/seed/s${encodeURI(
              page.pageURL.replaceAll('/', '-')
            )}/232/124`,
            title: page.pageAttributes.title,
            caption:
              page.pageAttributes.caption ||
              'Don\'t forget to add the "caption" to the frontmatter for this page',
            route: 'show',
            model: page.pageURL,
          };
        });
    });
    return cards;
  }
}
