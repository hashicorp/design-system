export default class HdsFormTextInputFieldComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    isPasswordMasked: boolean;
    hasVisibilityToggle: any;
    type: any;
    /**
     * @param showVisibilityToggle
     * @type {boolean}
     * @default false
     */
    get showVisibilityToggle(): boolean;
    /**
     * @param visibilityToggleAriaLabel
     * @type {string}
     * @default 'Show password'
     */
    get visibilityToggleAriaLabel(): string;
    /**
     * @param visibilityToggleAriaMessageText
     * @type {string}
     * @default 'Password is now hidden'
     */
    get visibilityToggleAriaMessageText(): string;
    onClickTogglePasswordReadability(): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=field.d.ts.map