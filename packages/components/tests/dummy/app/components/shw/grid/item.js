import Component from '@glimmer/component';

export default class GridItemComponent extends Component {
  get classNames() {
    let classes = ['shw-grid__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-grid__item--grow');
    }

    return classes.join(' ');
  }
}
