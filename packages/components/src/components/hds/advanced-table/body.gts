import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';

type HdsAdvancedTableRowWrapper<T> = {
  id: string;
  source: T;
  depth: number;
  isExpanded: boolean;
  isVisible: boolean;
  hasChildren: boolean;
};

export interface HdsAdvancedTableBodySignature<T> {
  Args: {
    childrenKey: string;
    expandedRowIds: Set<string>;
    sortedModel: T[];
  };
  Blocks: {
    default: [
      {
        lastVisibleRowId: string | undefined;
        rows: HdsAdvancedTableRowWrapper<T>[];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableBody<
  T extends Record<string, unknown>,
> extends Component<HdsAdvancedTableBodySignature<T>> {
  @cached
  get rows(): HdsAdvancedTableRowWrapper<T>[] {
    const { sortedModel, childrenKey, expandedRowIds } = this.args;
    const rows: HdsAdvancedTableRowWrapper<T>[] = [];

    const traverse = (
      items: T[],
      depth: number,
      ancestorsExpanded: boolean
    ) => {
      for (const item of items) {
        const id = guidFor(item);
        const isExpanded = expandedRowIds.has(id);
        const children = item[childrenKey] as T[] | undefined;
        const hasChildren = Array.isArray(children) && children.length > 0;
        const isVisible = depth === 0 || ancestorsExpanded;

        rows.push({
          id,
          source: item,
          depth,
          isExpanded,
          isVisible,
          hasChildren,
        });

        if (hasChildren) {
          traverse(children, depth + 1, isVisible && isExpanded);
        }
      }
    };

    traverse(sortedModel, 0, false);

    return rows;
  }

  get lastVisibleRowId(): string | undefined {
    const visibleRows = this.rows.filter((row) => row.isVisible);
    const lastVisibleRow = visibleRows[visibleRows.length - 1];

    return lastVisibleRow?.id;
  }

  <template>
    <div class="hds-advanced-table__tbody" role="rowgroup" ...attributes>
      {{yield (hash lastVisibleRowId=this.lastVisibleRowId rows=this.rows)}}
    </div>
  </template>
}
