import Component from '@glimmer/component';

export default class Index extends Component {
  get noop() {
    return () => {};
  }
}
