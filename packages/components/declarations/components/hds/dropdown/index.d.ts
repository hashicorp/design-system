export const DEFAULT_POSITION: "bottom-right";
export const POSITIONS: string[];
export default class HdsDropdownIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param listPosition
     * @type {string}
     * @default bottom-right
     * @description Determines the position of the "list"
     */
    get listPosition(): string;
    /**
     * Get the class names to apply to the element
     * @method classNames
     * @return {string} The "class" attribute to apply to the root element
     */
    get classNames(): string;
    /**
     * Get the class names to apply to the content
     * @method classNamesContent
     * @return {string} The "class" attribute to apply to the disclosed content
     */
    get classNamesContent(): string;
    didInsertList(element: any): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map