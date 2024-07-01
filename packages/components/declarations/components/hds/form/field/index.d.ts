export const LAYOUT_TYPES: string[];
export default HdsFormFieldIndexComponent;
declare class HdsFormFieldIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    appendDescriptor(element: any): void;
    removeDescriptor(element: any): void;
    /**
     * Sets the layout of the field
     *
     * @param layout
     * @type {string}
     */
    get layout(): string;
    /**
     * Calculates the unique ID to assign to the form control
     */
    get id(): any;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    /**
     * @param isRequired
     * @type {boolean}
     * @default false
     */
    get isRequired(): boolean;
    /**
     * @param isOptional
     * @type {boolean}
     * @default false
     */
    get isOptional(): boolean;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map