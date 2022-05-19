import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DummySidebarComponent extends Component {
  @service router;

  sections = [
    {
      title: 'Overview',
      fragment: '#',
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
  get dummyRouteUrl() {
    let dummyPathUrl = this.router.currentURL;
    return dummyPathUrl;
  }
}
