/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { get } from '@ember/object';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsModal,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/modal/index';
import { NAMES as ICON_NAMES } from '@hashicorp/design-system-components/components/hds/icon/index';

// Static color to icon mapping
const colorToIconMap: Record<
  (typeof COLORS)[number],
  (typeof ICON_NAMES)[number] | undefined
> = {
  neutral: undefined,
  warning: 'alert-triangle',
  critical: 'alert-diamond',
};

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item
        @label={{capitalize color}}
        class="shw-component-modal-sample-item"
      >
        <HdsModal open @color={{color}} id="modal-example-{{color}}" as |M|>
          <M.Header @icon={{get colorToIconMap color}} @tagline="Tagline">
            {{capitalize color}}
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">Modal
              content</p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton
                type="submit"
                @text="Confirm"
                @color={{if (eq color "critical") "critical"}}
              />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionColor;
