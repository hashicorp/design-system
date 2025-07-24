import Component from '@glimmer/component';
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
    get min(): number;
    get max(): number;
    get step(): number;
    get value(): number;
    get classNames(): string;
    get inlineStyles(): Record<string, string>;
    handleInput(event: Event): void;
}
export {};
