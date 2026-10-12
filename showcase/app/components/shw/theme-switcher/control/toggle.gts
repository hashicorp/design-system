import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';

interface ShwThemeSwitcherControlToggleSignature {
  Args: {
    label: string;
    checked?: boolean;
    onToggle?: (event: Event) => void;
  };
}

export default class ShwThemeSwitcherControlToggle extends Component<ShwThemeSwitcherControlToggleSignature> {
  inputId = `shw-theme-switcher-input-${guidFor(this)}`;

  onToggle = (event: Event) => {
    if (this.args.onToggle) {
      this.args.onToggle(event);
    }
  };

  <template>
    <div class="shw-theme-switcher-popover__control-wrapper">
      <label
        class="shw-theme-switcher__control-label"
        for={{this.inputId}}
      >{{@label}}</label>
      <input
        id={{this.inputId}}
        type="checkbox"
        checked={{@checked}}
        class="shw-theme-switcher__control-toggle"
        {{on "click" this.onToggle}}
      />
    </div>
  </template>
}
