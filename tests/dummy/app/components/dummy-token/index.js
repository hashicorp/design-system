import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DummyPlaceholderIndexComponent extends Component {
  get token() {
    let { token } = this.args;
    return {
      name: token.name,
      value: token.value,
      category: token.attributes.category,
      original_value: token.original.value,
      deprecated: token.deprecated,
      comment: token?.documentation?.comment ?? token?.comment ?? undefined,
    };
  }

  get isAlias() {
    return (
      this.token.original_value !== this.token.value &&
      this.token.original_value.includes('{')
    );
  }

  get isDeprecated() {
    return this.token.deprecated;
  }

  get isColor() {
    return (
      this.token.value.startsWith('#') || this.token.value.startsWith('rgb')
    );
  }

  get colorPreviewStyle() {
    return this.isColor ? htmlSafe(`color: ${this.token.value}`) : undefined;
  }
}
