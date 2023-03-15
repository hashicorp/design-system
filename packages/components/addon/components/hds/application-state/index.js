import Component from '@glimmer/component';

export default class HdsApplicationStateIndexComponent extends Component {
  get errorCode() {
    return this.args.errorCode || null;
  }
}
