import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    data=@record\n    isExpandable=this.hasChildren\n    id=this._id\n    depth=this.depth\n    onClickToggle=this.onClickToggle\n    isExpanded=this._isExpanded\n    parentId=@parentId\n    rowIndex=this.rowIndex\n  )\n}}\n{{#if (and this.hasChildren this._isExpanded)}}\n  {{#each this.children as |childRecord|}}\n    <Hds::AdvancedTable::ExpandableTrGroup\n      @record={{childRecord}}\n      @depth={{this.childrenDepth}}\n      @align={{@align}}\n      @parentId={{this._id}}\n      @childrenKey={{this.childrenKey}}\n      @rowIndex=\"{{this.rowIndex}}.{{this.childrenDepth}}\"\n      as |T|\n    >\n      {{yield\n        (hash\n          data=T.data\n          isExpandable=T.isExpandable\n          depth=T.depth\n          onClickToggle=T.onClickToggle\n          isExpanded=T.isExpanded\n          parentId=T.parentId\n          id=T.id\n        )\n      }}\n    </Hds::AdvancedTable::ExpandableTrGroup>\n  {{/each}}\n{{/if}}");

var _class, _descriptor;
let HdsAdvancedTableExpandableTrGroup = (_class = class HdsAdvancedTableExpandableTrGroup extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_isExpanded", _descriptor, this);
    _defineProperty(this, "_id", guidFor(this));
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
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_isExpanded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableExpandableTrGroup);

export { HdsAdvancedTableExpandableTrGroup as default };
//# sourceMappingURL=expandable-tr-group.js.map
