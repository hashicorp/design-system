export default class HdsPaginationSizeSelectorComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Generates a unique ID for the pageSize select
     *
     * @param SizeSelectorId
     */
    SizeSelectorId: string;
    /**
     * @param pageSizes
     * @type {array of numbers}
     * @description Set the page sizes users can select from.
     */
    get pageSizes(): array;
    /**
     * @param selectedSize
     * @type integer
     * @description The selected ("current") page size
     */
    get selectedSize(): integer;
    /**
     * @param label
     * @type string
     * @default "Items per page"
     * @description The label text for the select
     */
    get label(): string;
    onChange(e: any): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map