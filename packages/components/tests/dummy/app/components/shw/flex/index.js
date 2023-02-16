import Component from '@glimmer/component';

export default class FlexIndexComponent extends Component {
  direction = this.args.direction ?? 'row';

  get classNames() {
    let classes = ['shw-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-flex--direction-${this.direction}`);

    return classes.join(' ');
  }
}
