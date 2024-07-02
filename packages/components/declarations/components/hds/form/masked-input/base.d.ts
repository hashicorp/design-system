export default class HdsFormMaskedInputBaseComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    isContentMasked: any;
    onClickToggleMasking(): void;
    /**
     * Calculates the unique ID to assign to the form control
     */
    get id(): any;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Show masked content'
     */
    get visibilityToggleAriaLabel(): string;
    /**
     * @param ariaMessageText
     * @type {string}
     * @default 'Input content is now hidden'
     */
    get visibilityToggleAriaMessageText(): string;
    /**
     * @param copyButtonText
     * @type {string}
     * @default 'Copy masked content'
     */
    get copyButtonText(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=base.d.ts.map