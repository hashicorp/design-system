import Component from '@glimmer/component';

// colors values taken from Boostrap for the time being...
// (later we will update them when there are actual designs for this component)

export const DEFAULT_COLOR = 'neutral-light';
export const COLORS = [
  'neutral-light',
  'neutral-dark',
  'highlight',
  'success',
  'warning',
  'critical',
];

export default class DocBadgeComponent extends Component {
  get color() {
    return this.args.color ?? DEFAULT_COLOR;
  }
  get classNames() {
    let classes = ['doc-badge'];

    // add a class based on the @color argument
    classes.push(`doc-badge--color-${this.color}`);

    return classes.join(' ');
  }
}
