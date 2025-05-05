import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface AccessibleRangeSliderArgs {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (
    values: { value: number } | { startValue: number; endValue: number }
  ) => void;
}

interface AccessibleRangeSliderSignature {
  Args: AccessibleRangeSliderArgs;
  Element: HTMLInputElement;
}

export default class AccessibleRangeSlider extends Component<AccessibleRangeSliderSignature> {
  @tracked _value: number;

  constructor(owner: unknown, args: AccessibleRangeSliderArgs) {
    super(owner, args);

    this._value = args.value ?? 0;
  }

  get min(): number {
    return this.args.min ?? 0;
  }
  get max(): number {
    return this.args.max ?? 100;
  }
  get step(): number {
    return this.args.step ?? 1;
  }

  get classNames(): string {
    return 'hds-form-range-slider';
  }
  get inlineStyles(): Record<string, string> {
    const percent = ((this._value - this.min) / (this.max - this.min)) * 100;

    return {
      '--progress': `${percent}%`,
      background: `linear-gradient(
        to right,
        var(--token-color-palette-blue-200) 0%,
        var(--token-color-palette-blue-200) ${percent}%,
        var(--token-color-palette-neutral-200) ${percent}%,
        var(--token-color-palette-neutral-200) 100%
      )`,
    };
  }

  @action
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    this._value = value;
    this.args.onChange?.({ value });
  }
}
