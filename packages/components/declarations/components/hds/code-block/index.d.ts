export default class HdsCodeBlockIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    prismCode: string;
    /**
     * Generates a unique ID for the code content
     *
     * @param preCodeId
     */
    preCodeId: string;
    /**
     * @param code
     * @type {string}
     * @description code text content for the CodeBlock
     */
    get code(): string;
    /**
     * @param language
     * @type {string}
     * @default undefined
     * @description name of coding language used within CodeBlock for syntax highlighting
     */
    get language(): string;
    /**
     * @param hasLineNumbers
     * @type {boolean}
     * @default true
     * @description Displays line numbers if true
     */
    get hasLineNumbers(): boolean;
    /**
     * @param isStandalone
     * @type {boolean}
     * @default true
     * @description Make CodeBlock container corners appear rounded
     */
    get isStandalone(): boolean;
    /**
     * @param hasLineWrapping
     * @type {boolean}
     * @default false
     * @description Make text content wrap on multiple lines
     */
    get hasLineWrapping(): boolean;
    setPrismCode(element: any): void;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map