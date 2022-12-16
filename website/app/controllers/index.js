import Controller from '@ember/controller';

export default class IndexController extends Controller {
  cards = [
    {
      title: 'About',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'about',
    },
    {
      title: 'Foundations',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'foundations',
    },
    {
      title: 'Components',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'components',
    },
    {
      title: 'Patterns',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'patterns',
    },
  ];
}
