import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';

type HdsAdvancedTableRowWrapper<T> = {
  id: string;
  source: T;
  depth: number;
  isExpanded: boolean;
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
        visibleRows: HdsAdvancedTableRowWrapper<T>[];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableBody<
  T extends Record<string, unknown>,
> extends Component<HdsAdvancedTableBodySignature<T>> {
  @cached
  get visibleRows(): HdsAdvancedTableRowWrapper<T>[] {
    const { sortedModel, childrenKey, expandedRowIds } = this.args;
    const rows: HdsAdvancedTableRowWrapper<T>[] = [];

    const traverse = (items: T[], depth: number) => {
      for (const item of items) {
        const id = guidFor(item);

        const isExpanded = expandedRowIds.has(id);

        const children = item[childrenKey] as T[] | undefined;
        const hasChildren = Array.isArray(children) && children.length > 0;

        rows.push({
          id,
          source: item,
          depth,
          isExpanded,
          hasChildren,
        });

        if (isExpanded && hasChildren) {
          traverse(children, depth + 1);
        }
      }
    };

    traverse(sortedModel, 0);

    return rows;
  }

  get lastVisibleRowId(): string | undefined {
    const lastVisibleRow = this.visibleRows[this.visibleRows.length - 1];

    if (lastVisibleRow === undefined) {
      return undefined;
    }

    return lastVisibleRow.id;
  }

  <template>
    <div class="hds-advanced-table__tbody" role="rowgroup" ...attributes>
      {{yield
        (hash
          lastVisibleRowId=this.lastVisibleRowId visibleRows=this.visibleRows
        )
      }}
    </div>
  </template>
}
