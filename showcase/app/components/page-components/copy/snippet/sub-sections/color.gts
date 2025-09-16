/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsCopySnippet } from '@hashicorp/design-system-components/components';

import { COLORS } from '@hashicorp/design-system-components/components/hds/copy/snippet/index';

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item @label={{capitalize color}}>
        <HdsCopySnippet
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
          @color={{color}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionColor;
