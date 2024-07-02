export default class HdsTableThSortComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param labelId
     */
    labelId: string;
    /**
     * @param ariaSort
     * @type {string}
     * @private
     * @default none
     * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
     */
    private get ariaSort();
    /**
     * @param align
     * @type {string}
     * @default left
     * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
     */
    get align(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=th-sort.d.ts.map