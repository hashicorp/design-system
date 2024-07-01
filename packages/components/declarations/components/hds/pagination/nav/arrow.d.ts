export const DIRECTIONS: string[];
export default class HdsPaginationControlArrowComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    get content(): {
        label: string;
        icon: string;
        ariaLabel: string;
    } | undefined;
    /**
     * @param showLabel
     * @type {boolean}
     * @default true
     * @description Show the labels for the control
     */
    get showLabel(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    onClick(): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=arrow.d.ts.map