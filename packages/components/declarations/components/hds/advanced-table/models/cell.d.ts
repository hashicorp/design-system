import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableTdSignature } from '../td.ts';
interface HdsAdvancedTableCellArgs {
    columnKey: HdsAdvancedTableColumnType['key'];
    content: unknown;
}
export default class HdsAdvancedTableCell {
    _element: HdsAdvancedTableTdSignature['Element'];
    columnKey: HdsAdvancedTableColumnType['key'];
    content: unknown;
    constructor(args: HdsAdvancedTableCellArgs);
}
export {};
