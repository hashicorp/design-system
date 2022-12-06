import Component from '@glimmer/component';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['active', 'default', 'hover', 'focus'];
  }
  //
  // TODO! move also the data fetching here
  //
}
