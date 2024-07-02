export const DEFAULT_TYPE: "text";
export const TYPES: string[];
export default class HdsFormTextInputBaseComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Sets the type of input
     *
     * @param type
     * @type {string}
     * @default 'text'
     */
    get type(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=base.d.ts.map