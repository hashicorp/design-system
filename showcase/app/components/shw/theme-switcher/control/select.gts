import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

interface ShwThemeSwitcherControlSelectSignature {
  Args: {
    label: string;
    values?: string[] | Record<string, string>;
    selectedValue?: string;
    onChange?: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export default class ShwThemeSwitcherControlSelect extends Component<ShwThemeSwitcherControlSelectSignature> {
  selectId = `shw-theme-switcher-select-${guidFor(this)}`;

  get options() {
    if (Array.isArray(this.args.values)) {
      // Convert array to an object where keys and values are the same
      return this.args.values.reduce(
        (acc, value) => {
          acc[value] = value;
          return acc;
        },
        {} as Record<string, string>,
      );
    } else {
      // If values is already an object, return it directly
      return this.args.values;
    }
  }

  onChange = (event: Event) => {
    if (this.args.onChange) {
      this.args.onChange(event);
    }
  };

  <template>
    <div class="shw-theme-switcher-popover__control-wrapper">
      <label
        class="shw-theme-switcher__control-label"
        for={{this.selectId}}
      >{{@label}}</label>
      <select
        id={{this.selectId}}
        class="shw-theme-switcher__control-select"
        {{on "change" this.onChange}}
      >
        {{#if this.options}}
          {{#each-in this.options as |key text|}}
            <option
              value={{key}}
              selected={{eq key @selectedValue}}
            >{{text}}</option>
          {{/each-in}}
        {{else}}
          {{yield}}
        {{/if}}
      </select>
    </div>
  </template>
}
