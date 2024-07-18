export const DEFAULT_SIZE: "medium";
export const DEFAULT_COLOR: "primary";
export const SIZES: string[];
export const COLORS: string[];
export default class HdsDropdownToggleButtonComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Generates a unique ID for the button
     *
     * @param toggleButtonId
     */
    toggleButtonId: string;
    /**
     * @param text
     * @type {string}
     * @description The text of the button. If no text value is defined an error will be thrown.
     */
    get text(): string;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the button; acceptable values are `small` and `medium`
     */
    get size(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of button to be used; acceptable values are `primary` and  `secondary`
     */
    get color(): string;
    /**
     * @param isFullWidth
     * @type {boolean}
     * @default false
     * @description Indicates that a button should take up the full width of the parent container. The default is false.
     */
    get isFullWidth(): boolean;
    /**
     * @param onClick
     * @type {function}
     * @default () => {}
     */
    get onClick(): Function;
    /**
     * @param badgeType
     * @type {string}
     * @default 'filled'
     * @description ensures that the correct Badge/BadgeCount type is used to meet contrast requirements
     */
    get badgeType(): string;
    /**
     * Get the class names to apply to the component.
     * @method ToggleButton#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=button.d.ts.map