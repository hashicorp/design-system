import Component from '@glimmer/component';

import USER_WITH_MORE_COLUMNS from 'website/mocks/user-with-more-columns';

export default class LocalComponent extends Component {
  get model() {
    return { demoDataWithLargeNumberOfColumns: USER_WITH_MORE_COLUMNS };
  }
}
