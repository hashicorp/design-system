export default class HdsBreadcrumbComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param onDidInsert
     * @type {function}
     * @default () => {}
     */
    get didInsert(): Function;
    /**
     * @param itemsCanWrap
     * @type {boolean}
     * @default true
     */
    get itemsCanWrap(): boolean;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'breadcrumbs'
     */
    get ariaLabel(): string;
    /**
     * Get the class names to apply to the component.
     * @method Breadcrumb#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map