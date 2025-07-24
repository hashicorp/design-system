import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsFormHeaderTitleTagValues } from '../types.js';
import { HdsTextSizeValues } from '../../text/types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Display class=\"hds-form__header-title\" @tag={{this.tag}} @size={{this.size}} @color=\"strong\" ...attributes>\n  {{yield}}\n</Hds::Text::Display>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
const DEFAULT_TAG = HdsFormHeaderTitleTagValues.Div;
const TAGS = Object.values(HdsFormHeaderTitleTagValues);
class HdsFormHeaderTitle extends Component {
  get tag() {
    const {
      tag = DEFAULT_TAG
    } = this.args;
    assert(`@tag for "Hds::Form::Header::Title" must be one of the following: ${TAGS.join(', ')}; received: ${tag}`, TAGS.includes(tag));
    return tag;
  }
  get size() {
    return this.args.size ?? DEFAULT_SIZE;
  }
}
setComponentTemplate(TEMPLATE, HdsFormHeaderTitle);

export { DEFAULT_SIZE, DEFAULT_TAG, TAGS, HdsFormHeaderTitle as default };
//# sourceMappingURL=title.js.map
