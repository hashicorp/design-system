export const ID_PREFIX: "helper-text-";
export default class HdsFormHelperTextIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
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