/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsModal,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/modal/index';

const SubSectionSize: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item
        @label={{capitalize size}}
        class="shw-component-modal-sample-item"
      >
        <HdsModal open @size={{size}} id="modal-example-{{size}}" as |M|>
          <M.Header>
            {{capitalize size}}
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">Modal
              content</p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionSize;
