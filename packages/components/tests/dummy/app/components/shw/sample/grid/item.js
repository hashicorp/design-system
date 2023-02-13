import Component from '@glimmer/component';

export default class SampleGridItemComponent extends Component {
  get classNames() {
    let classes = ['shw-sample-grid__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-sample-grid__item--grow');
    }

    return classes.join(' ');
  }
}
