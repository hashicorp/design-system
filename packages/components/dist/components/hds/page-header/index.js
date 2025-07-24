import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<header class=\"hds-page-header\" ...attributes>\n  {{yield (hash Breadcrumb=(component \"hds/yield\"))}}\n  <div class=\"hds-page-header__body\">\n    {{yield (hash IconTile=(component \"hds/icon-tile\" size=\"medium\"))}}\n    <div class=\"hds-page-header__main\">\n      <div class=\"hds-page-header__content\">\n        <div class=\"hds-page-header__title-wrapper\">\n          {{yield (hash Title=(component \"hds/page-header/title\"))}}\n          {{yield (hash Badges=(component \"hds/page-header/badges\"))}}\n        </div>\n        <div class=\"hds-page-header__metadata\">\n          {{yield\n            (hash\n              Subtitle=(component \"hds/page-header/subtitle\")\n              Description=(component \"hds/page-header/description\")\n              Generic=(component \"hds/yield\")\n            )\n          }}\n        </div>\n      </div>\n      {{yield (hash Actions=(component \"hds/page-header/actions\"))}}\n    </div>\n  </div>\n</header>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsPageHeader = TemplateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsPageHeader);

export { index as default };
//# sourceMappingURL=index.js.map
