export default class HdsSuperSelectSingleBaseComponent extends PowerSelectComponent {
    calculatePosition(trigger: any, content: any): {};
    /**
     * Determine if `@afterOptionsComponent` gets displayed
     * @param showAfterOptions
     * @type {boolean}
     * @default false
     */
    get showAfterOptions(): boolean;
    /**
     * Get the search placeholder text
     * @param searchPlaceholder
     * @type {string}
     * @default 'Search'
     */
    get searchPlaceholder(): string;
    /**
     * Get the maxWidth to apply to the dropdown
     * @param dropdownMaxWidth
     * @type {string}
     * @default 'none'
     */
    get dropdownMaxWidthStyle(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import PowerSelectComponent from 'ember-power-select/components/power-select';
//# sourceMappingURL=base.d.ts.map