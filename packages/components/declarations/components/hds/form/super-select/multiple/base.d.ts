export default class HdsSuperSelectMultipleBaseComponent extends PowerSelectComponent {
    powerSelectAPI: any;
    showOnlySelected: boolean;
    showNoSelectedMessage: boolean;
    get selectedCount(): any;
    get optionsCount(): number | "0";
    calculatePosition(trigger: any, content: any): {};
    /**
     * This action sets the powerSelectAPI property and optionally calls a registerAPI function.
     *
     * @param {Object} powerSelectAPI - The API object for the PowerSelect component.
     *
     * If a `registerAPI` function is passed in through the component's arguments,
     * this function will be called with the `powerSelectAPI` as its argument.
     * This allows parent components or controllers to have access to the PowerSelect API.
     *
     * The `powerSelectAPI` is also stored on the component instance and used in `clearSelected`
     */
    setPowerSelectAPI(powerSelectAPI: Object): void;
    showSelected(): void;
    showAll(): void;
    clearSelected(): void;
    /**
     * Determine if `@afterOptionsComponent` gets displayed
     * @param showAfterOptions
     * @type {boolean}
     * @default true
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