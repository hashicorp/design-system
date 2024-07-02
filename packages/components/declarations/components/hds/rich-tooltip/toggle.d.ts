export const DEFAULT_ICONPOSITION: "trailing";
export const ICONPOSITIONS: string[];
export const SIZES: string[];
export default class HdsRichTooltipToggleComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param isInline
     * @type {boolean}
     * @default true
     * @description sets display inline for the element
     */
    get isInline(): boolean;
    /**
     * @param iconPosition
     * @type {string}
     * @default leading
     * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
     */
    get iconPosition(): string;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the "info" text; acceptable values are `small`, `medium`, `large`
     */
    get size(): string;
    /**
     * Get the class names to apply to the component.
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=toggle.d.ts.map