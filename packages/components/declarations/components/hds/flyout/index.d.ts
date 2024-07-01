export const DEFAULT_SIZE: "medium";
export const DEFAULT_HAS_OVERLAY: true;
export const SIZES: string[];
export default class HdsFlyoutIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    isOpen: boolean;
    /**
     * Sets the size of the flyout
     * Accepted values: medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): string;
    /**
     * Calculates the unique ID to assign to the title
     */
    get id(): any;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    registerOnCloseCallback(): void;
    didInsert(element: any): void;
    body: HTMLElement | undefined;
    bodyInitialOverflowValue: string | undefined;
    willDestroyNode(): void;
    open(): void;
    onDismiss(): Promise<void>;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map