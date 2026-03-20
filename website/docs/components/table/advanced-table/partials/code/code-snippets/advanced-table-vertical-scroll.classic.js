import Component from '@glimmer/component';

import USER_DATA from 'website/mocks/user-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    return USER_DATA;
  }
}
