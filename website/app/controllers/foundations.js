import Controller from '@ember/controller';

export default class FoundationsController extends Controller {
  cards = [
    {
      image: 'https://picsum.photos/seed/s{{1}}/232/124',
      title: 'Tokens',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/tokens/03--how-to-use/',
    },
    {
      image: 'https://picsum.photos/seed/s{{2}}/232/124',
      title: 'Colors',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/colors/03--how-to-use/',
    },
    {
      image: 'https://picsum.photos/seed/s{{3}}/232/124',
      title: 'Typography',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/typography/03--how-to-use/',
    },
    {
      image: 'https://picsum.photos/seed/s{{4}}/232/124',
      title: 'Icons ⛔️',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/icons',
    },
    {
      image: 'https://picsum.photos/seed/s{{5}}/232/124',
      title: 'Elevation',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/elevation/03--how-to-use/',
    },
    {
      image: 'https://picsum.photos/seed/s{{6}}/232/124',
      title: 'Focus Ring',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      route: 'show',
      model: 'foundations/focus-ring/03--how-to-use/',
    },
  ];
}
