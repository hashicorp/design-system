export const DEFAULT_SIZE: "medium";
export const DEFAULT_COLOR: "neutral";
export const SIZES: string[];
export const COLORS: string[];
export default class HdsModalIndexComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    isOpen: boolean;
    isDismissDisabled: any;
    /**
     * Sets the size of the modal dialog
     * Accepted values: small, medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): string;
    /**
     * Sets the color of the modal dialog
     * Accepted values: neutral, warning, critical
     *
     * @param color
     * @type {string}
     * @default 'neutral'
     */
    get color(): string;
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