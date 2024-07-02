export default class HdsTableThComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param labelId
     */
    labelId: string;
    /**
     * @param align
     * @type {string}
     * @default left
     * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
     */
    get align(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=th.d.ts.map