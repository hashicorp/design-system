export const DEFAULT_COLOR: "action";
export const COLORS: string[];
export default class HdsDropdownListItemInteractiveComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param text
     * @type {string}
     * @description The text of the item. If no text value is defined an error will be thrown
     */
    get text(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of the item (when item is set to interactive)
     */
    get color(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=interactive.d.ts.map