import Controller from '@ember/controller';

export default class ComponentsController extends Controller {
  get subTOC() {
    // NOTICE: the TOC comes direclty from the application "model" (see addons/field-guide/addon/routes/application.js)
    // TODO! important: instead of spreading the content all over the model, group the TOC under a specific "key"!

    // hacky way to have the subTOC items in the right order
    const subIDs = ['components', 'overrides', 'utilities'];
    const subTOC = {};

    // TODO! convert this to a recursive function shared with the "Foundations page"
    this.model
      .filter((item) => subIDs.includes(item.id))
      .forEach((item) => {
        const { id, title, pages } = item;
        const cards = [];
        pages.forEach((page) => {
          if (page.pages && page.pages.length > 0) {
            if (page.pages[0].pages) {
              // TODO recursive
              page.pages.forEach((subpage) => {
                cards.push({
                  image: `https://picsum.photos/seed/s${encodeURI(
                    page.subtitle
                  )}/232/124`,
                  title: subpage.title,
                  description:
                    'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
                  route: 'show',
                  // model: `${subpage.id}/${subpage.pages[0].id}`,
                  model: subpage.pages[0].id,
                });
              });
            } else {
              cards.push({
                image: `https://picsum.photos/seed/s${encodeURI(
                  page.title
                )}/232/124`,
                title: page.title,
                description:
                  'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
                route: 'show',
                model: page.pages[0].id,
              });
            }
          } else {
            console.log('????????????');
          }
        });
        subTOC[id] = { title, cards };
      });
    return subTOC;
  }
}
