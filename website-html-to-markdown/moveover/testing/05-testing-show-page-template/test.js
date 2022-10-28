import Component from '@glimmer/component';

export default class Test extends Component {
  get test() {
    console.log(this, this.attributes);
    return 'this is a test';
  }
}
