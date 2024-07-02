export const DENSITIES: string[];
export default class HdsTableIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    sortBy: any;
    sortOrder: any;
    selectAllCheckbox: undefined;
    selectableRows: any[];
    isSelectAllCheckboxSelected: undefined;
    /**
     * @param getSortCriteria
     * @type {string | function}
     * @default sortBy:sortOrder
     * @description Returns the sort criteria
     */
    get getSortCriteria(): string | Function;
    /**
     * @param identityKey
     * @type {string}
     * @default '@identity'
     * @description Returns the key to use for the table rows to provide more granular control. If no identityKey is defined, Ember's default `@identity` is used. See https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each
     * this would be relevant for any table that would have data that could update or change, i.e., polling.
     */
    get identityKey(): string;
    /**
     * @param sortedMessageText
     * @type {string}
     * @default ''
     * @description Returns the text to display in the sorted message. If no text is defined, the default text is used.
     */
    get sortedMessageText(): string;
    /**
     * @param isStriped
     * @type {boolean}
     * @default false
     * @description Determines whether the table rows should have alternating background colors; defaults to false.
     */
    get isStriped(): boolean;
    /**
     * @param isFixedLayout
     * @type {boolean}
     * @default false
     * @description Determines whether the table-display should be set to fixed; meaning, the table columns are of equal width no matter the content; defaults to false.
     */
    get isFixedLayout(): boolean;
    /**
     * @param density
     * @type {string}
     * @default 'medium'
     * @description Determines the density of the table cells; options are "short", "medium" and "tall". If no density is defined, "medium" is used.
     */
    get density(): string;
    /**
     * @param valign
     * @type {string}
     * @default 'top'
     * @description Determines the vertical alignment of the table cells; options are: "top", "middle", "baseline". If no valign is defined, "top" is used.
     */
    get valign(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    setSortBy(column: any): void;
    onSelectionChangeCallback(checkbox: any, selectionKey: any): void;
    onSelectionAllChange(): void;
    onSelectionRowChange(checkbox: any, selectionKey: any): void;
    didInsertSelectAllCheckbox(checkbox: any): void;
    willDestroySelectAllCheckbox(): void;
    didInsertRowCheckbox(checkbox: any, selectionKey: any): void;
    willDestroyRowCheckbox(selectionKey: any): void;
    setSelectAllState(): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map