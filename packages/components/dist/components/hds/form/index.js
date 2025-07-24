import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import './header/title.js';
import { HdsFormTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n{{#if (eq this.tag \"form\")}}\n  <form class=\"hds-form\" {{style this.sectionMaxWidthStyle}} ...attributes>\n    {{yield\n      (hash\n        Header=(component \"hds/form/header\")\n        HeaderTitle=(component \"hds/form/header/title\")\n        HeaderDescription=(component \"hds/form/header/description\")\n        Section=(component \"hds/form/section\")\n        SectionHeader=(component \"hds/form/section/header\")\n        SectionHeaderTitle=(component \"hds/form/header/title\" size=\"300\")\n        SectionHeaderDescription=(component \"hds/form/header/description\")\n        SectionMultiFieldGroup=(component \"hds/form/section/multi-field-group\")\n        SectionMultiFieldGroupItem=(component \"hds/form/section/multi-field-group/item\")\n        Separator=(component \"hds/form/separator\")\n        Footer=(component \"hds/form/footer\")\n      )\n    }}\n  </form>\n{{else}}\n  <div class=\"hds-form\" {{style this.sectionMaxWidthStyle}} ...attributes>\n    {{yield\n      (hash\n        Header=(component \"hds/form/header\")\n        HeaderTitle=(component \"hds/form/header/title\")\n        HeaderDescription=(component \"hds/form/header/description\")\n        Section=(component \"hds/form/section\")\n        SectionHeader=(component \"hds/form/section/header\")\n        SectionHeaderTitle=(component \"hds/form/header/title\" size=\"300\")\n        SectionHeaderDescription=(component \"hds/form/header/description\")\n        SectionMultiFieldGroup=(component \"hds/form/section/multi-field-group\")\n        SectionMultiFieldGroupItem=(component \"hds/form/section/multi-field-group/item\")\n        Separator=(component \"hds/form/separator\")\n        Footer=(component \"hds/form/footer\")\n      )\n    }}\n  </div>\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_TAG = HdsFormTagValues.Form;
const AVAILABLE_TAGS = Object.values(HdsFormTagValues);
class HdsForm extends Component {
  tag;
  constructor(owner, args) {
    super(owner, args);
    this.tag = args.tag ?? DEFAULT_TAG;
    assert(`@tag for "Hds::Form" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${this.tag}`, AVAILABLE_TAGS.includes(this.tag));
  }
  get sectionMaxWidthStyle() {
    const sectionMaxWidthStyle = {};
    if (this.args.sectionMaxWidth) {
      sectionMaxWidthStyle['--hds-form-section-max-width'] = this.args.sectionMaxWidth;
    }
    return sectionMaxWidthStyle;
  }
}
setComponentTemplate(TEMPLATE, HdsForm);

export { AVAILABLE_TAGS, DEFAULT_TAG, HdsForm as default };
//# sourceMappingURL=index.js.map
