export const DEFAULT_SIZE: "medium";
export const SIZES: string[];
export default class HdsDropdownToggleIconComponent extends Component<any> {
    constructor(...args: any[]);
    hasImage: boolean;
    onDidUpdateImageSrc(): void;
    onImageLoadError(): void;
    /**
     * @param text
     * @type {string}
     * @description The text of the `aria-label` applied to the toggle
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
     * @param iconSize
     * @type {string}
     * @default 24
     * @description ensures that the correct icon size is used
     */
    get iconSize(): string;
    /**
     * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
     *
     * @param hasChevron
     * @type {boolean}
     * @default true
     */
    get hasChevron(): boolean;
    /**
     * @param onClick
     * @type {function}
     * @default () => {}
     */
    get onClick(): Function;
    /**
     * Get the class names to apply to the component.
     * @method ToggleIcon#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=icon.d.ts.map