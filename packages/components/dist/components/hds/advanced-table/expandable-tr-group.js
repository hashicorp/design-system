import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    data=@record\n    isExpandable=this.hasChildren\n    id=this._id\n    depth=this.depth\n    onClickToggle=this.onClickToggle\n    isExpanded=this._isExpanded\n    parentId=@parentId\n    rowIndex=this.rowIndex\n  )\n}}\n{{#if (and this.hasChildren this._isExpanded)}}\n  {{#each this.children as |childRecord|}}\n    <Hds::AdvancedTable::ExpandableTrGroup\n      @record={{childRecord}}\n      @depth={{this.childrenDepth}}\n      @align={{@align}}\n      @parentId={{this._id}}\n      @childrenKey={{this.childrenKey}}\n      @rowIndex=\"{{this.rowIndex}}.{{this.childrenDepth}}\"\n      as |T|\n    >\n      {{yield\n        (hash\n          data=T.data\n          isExpandable=T.isExpandable\n          depth=T.depth\n          onClickToggle=T.onClickToggle\n          isExpanded=T.isExpanded\n          parentId=T.parentId\n          id=T.id\n        )\n      }}\n    </Hds::AdvancedTable::ExpandableTrGroup>\n  {{/each}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsAdvancedTableExpandableTrGroup extends Component {
  static {
    g(this.prototype, "_isExpanded", [tracked], function () {
      return false;
    });
  }
  #_isExpanded = (i(this, "_isExpanded"), undefined);
  _id = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
    this._isExpanded = this.args.record['isOpen'] && typeof this.args.record['isOpen'] === 'boolean' ? this.args.record['isOpen'] : false;
  }
  get childrenKey() {
    const {
      childrenKey = 'children'
    } = this.args;
    return childrenKey;
  }
  get children() {
    const {
      record
    } = this.args;
    if (record[this.childrenKey]) {
      const children = record[this.childrenKey];
      if (Array.isArray(children)) {
        return children;
      }
    }
    return undefined;
  }
  get hasChildren() {
    if (!this.children) return false;
    return true;
  }
  get depth() {
    const {
      depth = 0
    } = this.args;
    return depth;
  }
  get rowIndex() {
    const {
      rowIndex
    } = this.args;
    return `${rowIndex}`;
  }
  get childrenDepth() {
    return this.depth + 1;
  }
  onClickToggle() {
    this._isExpanded = !this._isExpanded;
  }
  static {
    n(this.prototype, "onClickToggle", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableExpandableTrGroup);

export { HdsAdvancedTableExpandableTrGroup as default };
//# sourceMappingURL=expandable-tr-group.js.map
