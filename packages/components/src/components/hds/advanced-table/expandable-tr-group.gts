/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableHorizontalAlignment,
} from './types.ts';
import type HdsAdvancedTableRow from './models/row.ts';
import { hash } from '@ember/helper';
export interface HdsAdvancedTableExpandableTrGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: HdsAdvancedTableRow;
    parentId?: string;
    rowIndex: number | string;
    shouldDisplayChildRows?: boolean;
    onClickToggle?: () => void;
  };
  Blocks: {
    default?: [
      {
        data: HdsAdvancedTableRow;
        isExpandable: boolean;
        id?: string;
        parentId?: string;
        depth: number;
        isExpanded?: HdsAdvancedTableExpandState;
        rowIndex?: string;
        shouldDisplayChildRows?: boolean;
        onClickToggle?: () => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
  private _id = guidFor(this);

  get depth(): number {
    return this.args.depth ?? 0;
  }

  get rowIndex(): string {
    return `${this.args.rowIndex}`;
  }

  get childrenDepth(): number {
    return this.depth + 1;
  }

  get shouldDisplayChildRows(): boolean {
    if (this.args.shouldDisplayChildRows === false) {
      return false;
    }

    return this.args.record.hasChildren && this.args.record.isOpen;
  }

  <template>
    {{yield
      (hash
        data=@record
        isExpandable=@record.hasChildren
        id=this._id
        depth=this.depth
        isExpanded=@record.isOpen
        parentId=@parentId
        rowIndex=this.rowIndex
        shouldDisplayChildRows=@shouldDisplayChildRows
        onClickToggle=@onClickToggle
      )
    }}
    {{#if @record.hasChildren}}
      {{#each @record.children as |childRecord|}}
        <HdsAdvancedTableExpandableTrGroup
          @record={{childRecord}}
          @depth={{this.childrenDepth}}
          @align={{@align}}
          @parentId={{this._id}}
          @rowIndex="{{this.rowIndex}}.{{this.childrenDepth}}"
          @shouldDisplayChildRows={{this.shouldDisplayChildRows}}
          @onClickToggle={{childRecord.onClickToggle}}
          as |T|
        >
          {{yield
            (hash
              data=T.data
              isExpandable=T.isExpandable
              depth=T.depth
              isExpanded=T.isExpanded
              parentId=T.parentId
              id=T.id
              shouldDisplayChildRows=T.shouldDisplayChildRows
              onClickToggle=T.onClickToggle
            )
          }}
        </HdsAdvancedTableExpandableTrGroup>
      {{/each}}
    {{/if}}
  </template>
}
