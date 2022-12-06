import Component from '@glimmer/component';

// export const DEFAULT_COLOR = 'neutral-light';
// export const COLORS = [
//   'neutral-light',
//   'neutral-dark',
//   'highlight',
//   'success',
//   'warning',
//   'critical',
// ];

export default class DocBannerComponent extends Component {
  // get color() {
  //   return this.args.color ?? DEFAULT_COLOR;
  // }
  get classNames() {
    let classes = ['doc-banner aaaa'];

    // // add a class based on the @color argument
    // classes.push(`doc-banner--color-${this.color}`);

    return classes.join(' ');
  }
}
