import Component from '@glimmer/component';

export default class FlexItemComponent extends Component {
  get classNames() {
    let classes = ['shw-flex__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-flex__item--grow');
    }

    return classes.join(' ');
  }
}
