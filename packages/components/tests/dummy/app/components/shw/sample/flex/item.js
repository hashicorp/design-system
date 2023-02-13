import Component from '@glimmer/component';

export default class SampleFlexItemComponent extends Component {
  get classNames() {
    let classes = ['shw-sample-flex__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-sample-flex__item--grow');
    }

    return classes.join(' ');
  }
}
