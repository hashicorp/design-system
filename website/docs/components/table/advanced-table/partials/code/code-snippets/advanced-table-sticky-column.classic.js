import Component from '@glimmer/component';

import USER_WITH_MORE_COLUMNS_DATA from 'website/mocks/user-with-more-columns-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    return USER_WITH_MORE_COLUMNS_DATA;
  }
}
