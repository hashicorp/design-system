/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsAlert } from '@hashicorp/design-system-components/components';
import NOOP from 'showcase/utils/noop';

const SubSectionDismiss: TemplateOnlyComponent = <template>
  <ShwTextH2>Dismiss</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <HdsAlert @type="inline" @color="neutral" as |A|>
        <A.Title>Without the dismiss button (default)</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="inline" @color="neutral" @onDismiss={{NOOP}} as |A|>
        <A.Title>With the dismiss button</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert
        @type="inline"
        @color="neutral"
        @icon={{false}}
        @onDismiss={{NOOP}}
        as |A|
      >
        <A.Title>With the dismiss button and no icon</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="inline" @color="neutral" @onDismiss={{NOOP}} as |A|>
        <A.Description>With the dismiss button and no title</A.Description>
      </HdsAlert>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionDismiss;
