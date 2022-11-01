import Controller from '@ember/controller';

export default class IndexController extends Controller {
  items = [
    {
      text: 'About',
      url: 'about',
    },
    {
      text: 'Foundations',
      url: 'foundations',
    },
    {
      text: 'Components',
      url: 'components',
    },
    {
      text: 'Patterns',
      url: 'patterns',
    },
  ];
}
