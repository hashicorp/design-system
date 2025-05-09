import Component from '@glimmer/component';
import { action } from '@ember/object';

interface AccessibleRangeSliderArgs {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

interface AccessibleRangeSliderSignature {
  Args: AccessibleRangeSliderArgs;
  Element: HTMLInputElement;
}

export default class AccessibleRangeSlider extends Component<AccessibleRangeSliderSignature> {
  get min(): number {
    return this.args.min ?? 0;
  }
  get max(): number {
    return this.args.max ?? 100;
  }
  get step(): number {
    return this.args.step ?? 1;
  }
  get value(): number {
    return this.args.value ?? this.min;
  }

  get classNames(): string {
    return 'hds-form-range-slider';
  }
  get inlineStyles(): Record<string, string> {
    const percent = ((this.value - this.min) / (this.max - this.min)) * 100;

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

    this.args.onChange?.(value);
  }
}
