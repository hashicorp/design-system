/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { array } from '@ember/helper';
import {
  HdsComposite,
  HdsLayoutGrid,
} from '@hashicorp/design-system-components/components';

import ShwTextBody from 'showcase/components/shw/text/body';

import type { HdsCompositeSignature } from '@hashicorp/design-system-components/components/hds/composite/index';

export interface HdsAlertDescriptionSignature {
  Args: {
    ariaLabel: string;
    loop?: HdsCompositeSignature['Args']['loop'];
    orientation?: HdsCompositeSignature['Args']['orientation'];
    wrap: HdsCompositeSignature['Args']['wrap'];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const CompositeWithHorizontalButtonList: TemplateOnlyComponent = <template>
  <HdsComposite
    @loop={{@loop}}
    @orientation={{@orientation}}
    @wrap={{@wrap}}
    as |c|
  >
    <div
      class="composite-with-grid"
      role="grid"
      aria-label={{@ariaLabel}}
      {{c.composite}}
    >
      {{#each (array "A" "B" "C") as |row|}}
        <HdsLayoutGrid
          class="composite-with-grid__row"
          role="row"
          @gap="8"
          {{c.group}}
        >
          {{#each (array "1" "2" "3" "4") as |col|}}
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>{{row}}{{col}}</ShwTextBody>
            </div>
          {{/each}}
        </HdsLayoutGrid>
      {{/each}}
    </div>
  </HdsComposite>
</template>;

export default CompositeWithHorizontalButtonList;
