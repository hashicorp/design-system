import Component from '@glimmer/component';

export default class DummySidebarComponent extends Component {
  sections = [
    {
      title: 'Overview',
      fragment: '',
      icon: 'collections',
    },
    {
      title: 'Component API',
      fragment: '#component-api',
      icon: 'hammer',
    },
    {
      title: 'How to use',
      fragment: '#how-to-use',
      icon: 'wrench',
    },
    {
      title: 'Design Guidelines',
      fragment: '#design-guidelines',
      icon: 'monitor',
    },
    {
      title: 'Accessibility',
      fragment: '#accessibility',
      icon: 'globe',
    },
    {
      title: 'Showcase',
      fragment: '#showcase',
      icon: 'camera',
    },
  ];
}
