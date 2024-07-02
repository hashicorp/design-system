export default class HdsTableThButtonSortComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
     *
     * @param prefixLabelId/suffixLabelId
     */
    prefixLabelId: string;
    suffixLabelId: string;
    /**
     * @param icon
     * @type {string}
     * @private
     * @default swap-vertical
     * @description Determines which icon to use based on the sort order defined
     */
    private get icon();
    /**
     * @param sortOrderLabel
     * @default 'ascending'
     * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
     */
    get sortOrderLabel(): "descending" | "ascending";
    /**
     * @param onClick
     * @type {function}
     * @default () => {}
     */
    get onClick(): Function;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=th-button-sort.d.ts.map