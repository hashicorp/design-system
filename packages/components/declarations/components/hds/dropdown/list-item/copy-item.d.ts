export default class HdsDropdownListItemCopyItemComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param text
     * @type {string}
     * @description The text of the item. If no text value is defined an error will be thrown
     */
    get text(): string;
    /**
     * @param isTruncated
     * @type {boolean}
     * @default true
     * @description Indicates that the text should be truncated instead of wrapping and using multiple lines.
     */
    get isTruncated(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=copy-item.d.ts.map