import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class SampleGridIndexComponent extends Component {
  get columns() {
    let { columns } = this.args;

    assert(
      '@columns for "Shw::Sample::Grid" must be defined',
      columns !== undefined
    );

    return columns;
  }

  get classNames() {
    let classes = ['shw-sample-grid'];

    // add a class based on the @columns argument
    classes.push(`shw-sample-grid--cols-${this.columns}`);

    return classes.join(' ');
  }
}
