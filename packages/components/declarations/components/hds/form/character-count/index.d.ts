export default class HdsFormCharacterCountIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    get currentLength(): any;
    pluralize(count: any, prefix?: string, noun?: string, suffix?: string): string;
    /**
     * @param maxLength
     * @type {number}
     * @default null
     * @description The maximum number of characters allowed.
     */
    get maxLength(): number;
    /**
     * @param minLength
     * @type {number}
     * @default null
     * @description The minimum number of characters allowed.
     */
    get minLength(): number;
    /**
     * @param remaining
     * @type {number}
     * @default null
     * @description The remaining number of characters.
     */
    get remaining(): number;
    /**
     * @param shortfall
     * @type {number}
     * @default null
     * @description The number of characters the content is falling short of.
     */
    get shortfall(): number;
    /**
     * @param message
     * @type {string}
     * @default null
     * @description The character count message presented to users
     */
    get message(): string;
    /**
     * Determines the unique ID to assign to the element
     * @method id
     * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
     */
    get id(): string | null;
    /**
     * @param onInsert
     * @type {function}
     * @default () => {}
     */
    get onInsert(): Function;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map