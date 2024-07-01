export const DEFAULT_PLACEMENT: "bottom";
export const PLACEMENTS: string[];
export default class HdsRichTooltipBubbleComponent extends Component<any> {
    constructor(owner: unknown, args: any);
    /**
     * @param placement
     * @type {string}
     * @description Determines the position of the "popover"
     */
    get placement(): string;
    get enableCollisionDetection(): any;
    get sizingStyles(): {
        width: any;
        'max-width': string;
        height: any;
        'max-height': string;
    };
    get anchoredPositionOptions(): {
        placement: string;
        offsetOptions: any;
        enableCollisionDetection: any;
        arrowSelector: string;
        arrowPadding: number;
    };
}
import Component from '@glimmer/component';
//# sourceMappingURL=bubble.d.ts.map