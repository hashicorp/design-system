export const DEFAULT_CONTROL_POSITION: "bottom";
export const DEFAULT_ALIGNMENT: "left";
export const CONTROL_POSITIONS: string[];
export const ALIGNMENTS: string[];
export default class HdsFormRadioCardIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Sets the position of the control
     * Accepted values: buttom, left
     *
     * @param type
     * @type {string}
     * @default 'bottom'
     */
    get controlPosition(): string;
    /**
     * Sets the alignment of the content
     * Accepted values: left, center
     *
     * @param alignnment
     * @type {string}
     * @default 'left'
     */
    get alignment(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map