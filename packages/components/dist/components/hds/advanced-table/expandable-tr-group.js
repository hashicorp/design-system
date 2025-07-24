import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    data=@record\n    isExpandable=@record.hasChildren\n    id=this._id\n    depth=this.depth\n    isExpanded=@record.isOpen\n    parentId=@parentId\n    rowIndex=this.rowIndex\n    shouldDisplayChildRows=@shouldDisplayChildRows\n    onClickToggle=@onClickToggle\n  )\n}}\n{{#if @record.hasChildren}}\n  {{#each @record.children as |childRecord|}}\n    <Hds::AdvancedTable::ExpandableTrGroup\n      @record={{childRecord}}\n      @depth={{this.childrenDepth}}\n      @align={{@align}}\n      @parentId={{this._id}}\n      @rowIndex=\"{{this.rowIndex}}.{{this.childrenDepth}}\"\n      @shouldDisplayChildRows={{this.shouldDisplayChildRows}}\n      @onClickToggle={{childRecord.onClickToggle}}\n      as |T|\n    >\n      {{yield\n        (hash\n          data=T.data\n          isExpandable=T.isExpandable\n          depth=T.depth\n          isExpanded=T.isExpanded\n          parentId=T.parentId\n          id=T.id\n          shouldDisplayChildRows=T.shouldDisplayChildRows\n          onClickToggle=T.onClickToggle\n        )\n      }}\n    </Hds::AdvancedTable::ExpandableTrGroup>\n  {{/each}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsAdvancedTableExpandableTrGroup extends Component {
  _id = guidFor(this);
  get depth() {
    return this.args.depth ?? 0;
  }
  get rowIndex() {
    return `${this.args.rowIndex}`;
  }
  get childrenDepth() {
    return this.depth + 1;
  }
  get shouldDisplayChildRows() {
    if (this.args.shouldDisplayChildRows === false) {
      return false;
    }
    return this.args.record.hasChildren && this.args.record.isOpen;
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableExpandableTrGroup);

export { HdsAdvancedTableExpandableTrGroup as default };
//# sourceMappingURL=expandable-tr-group.js.map
