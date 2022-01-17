import Component from '@glimmer/component';

export default class DummyPlaceholderIndexComponent extends Component {
  get token() {
    let { token } = this.args;
    return {
      name: token.name,
      value: token.value,
      category: token.attributes.category,
      original_value: token.original.value,
      comment: token?.documentation?.comment ?? token?.comment ?? undefined,
    };
  }

  get isAlias() {
    return (
      this.token.original &&
      this.token.original.value !== this.token.value &&
      this.token.original.value.includes('{')
    );
  }

  get isColor() {
    return (
      this.token.value.startsWith('#') || this.token.value.startsWith('rgb')
    );
  }

  get isDeprecated() {
    return this.token.deprecated;
  }

  get colorPreviewStyle() {
    return this.isColor ? `color: ${this.token.value}` : undefined;
  }
}
