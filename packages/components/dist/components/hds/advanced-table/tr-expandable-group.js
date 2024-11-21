import { _ as _applyDecoratedDescriptor, a as _defineProperty, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    data=@record\n    isExpandable=this.hasChildren\n    id=this.id\n    depth=this.depth\n    onClickToggle=this.onClickToggle\n    isExpanded=this.isExpanded\n    parentId=@parentId\n  )\n}}\n{{#if (and this.hasChildren this.isExpanded)}}\n  <div class=\"hds-advanced-table__tr-expandable-group\">\n    {{#each this.children as |childRecord|}}\n      <Hds::AdvancedTable::TrExpandableGroup\n        @record={{childRecord}}\n        @depth={{this.childrenDepth}}\n        @align={{@align}}\n        @parentId={{this.id}}\n        as |T|\n      >\n        {{yield\n          (hash\n            data=T.data\n            isExpandable=T.isExpandable\n            depth=T.depth\n            onClickToggle=T.onClickToggle\n            isExpanded=T.isExpanded\n            parentId=T.parentId\n            id=T.id\n          )\n        }}\n      </Hds::AdvancedTable::TrExpandableGroup>\n    {{/each}}\n  </div>\n{{/if}}");

var _class, _descriptor;
let HdsAdvancedTableTrExpandableGroup = (_class = class HdsAdvancedTableTrExpandableGroup extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "id", guidFor(this));
    _initializerDefineProperty(this, "isExpanded", _descriptor, this);
    this.isExpanded = this.args.record['isExpanded'] && typeof this.args.record['isExpanded'] === 'boolean' ? this.args.record['isExpanded'] : false;
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
  get childrenDepth() {
    return this.depth + 1;
  }
  onClickToggle() {
    this.isExpanded = !this.isExpanded;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isExpanded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableTrExpandableGroup);

export { HdsAdvancedTableTrExpandableGroup as default };
//# sourceMappingURL=tr-expandable-group.js.map
