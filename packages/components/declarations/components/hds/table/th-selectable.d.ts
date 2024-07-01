export default class HdsTableThSelectableComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    isSelected: any;
    /**
     * Generate a unique ID for the Checkbox
     * @return {string}
     */
    checkboxId: string;
    get ariaLabel(): string;
    didInsert(checkbox: any): void;
    willDestroy(checkbox: any, ...args: any[]): void;
    onSelectionChange(event: any): void;
    updateAriaLabel(event: any): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=th-selectable.d.ts.map