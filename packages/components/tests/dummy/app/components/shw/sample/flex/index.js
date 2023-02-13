import Component from '@glimmer/component';

export default class SampleFlexIndexComponent extends Component {
  direction = this.args.direction ?? 'row';

  get classNames() {
    let classes = ['shw-sample-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-sample-flex--direction-${this.direction}`);

    return classes.join(' ');
  }
}
