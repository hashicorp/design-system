import Controller from '@ember/controller';

export default class IndexController extends Controller {
  cards = [
    {
      image: 'https://picsum.photos/seed/1/232/124',
      title: 'About',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      href: 'about',
    },
    {
      image: 'https://picsum.photos/seed/2/232/124',
      title: 'Foundations',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      href: 'foundations',
    },
    {
      image: 'https://picsum.photos/seed/3/232/124',
      title: 'Components',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      href: 'components',
    },
    {
      image: 'https://picsum.photos/seed/4/232/124',
      title: 'Patterns',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      href: 'patterns',
    },
    {
      image: 'https://picsum.photos/seed/5/232/124',
      title: 'Testing',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      href: 'testing',
    },
  ];
}
