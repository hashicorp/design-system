export default HdsFormFieldsetIndexComponent;
declare class HdsFormFieldsetIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    appendDescriptor(element: any): void;
    removeDescriptor(element: any): void;
    /**
     * Sets the layout of the group
     *
     * @param layout
     * @type {enum}
     * @default 'vertical'
     */
    get layout(): enum;
    /**
     * Calculates the unique ID to assign to the fieldset
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