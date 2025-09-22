/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>display: inline-block</code></SGI.Label>
      <div {{style display="inline-block"}}>
        <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
      </div>
      <hr class="shw-component-button-containers-divider" />
      <div {{style display="inline-block"}}>
        <HdsButton
          @icon="plus"
          @text="This is a very long text that should go on multiple lines"
        />
      </div>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>display: inline-flex</code></SGI.Label>
      <div {{style display="inline-flex"}}>
        <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
      </div>
      <hr class="shw-component-button-containers-divider" />
      <div {{style display="inline-flex"}}>
        <HdsButton
          @icon="plus"
          @text="This is a very long text that should go on multiple lines"
        />
      </div>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>flex-grow: 0</code></SGI.Label>
      <div {{style display="flex"}}>
        <div {{style flex-grow="0"}}>
          <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
        </div>
      </div>
      <hr class="shw-component-button-containers-divider" />
      <div {{style display="flex"}}>
        <div {{style flex-grow="0"}}>
          <HdsButton
            @icon="plus"
            @text="This is a very long text that should go on multiple lines"
          />
        </div>
      </div>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>max-width: fit-content</code></SGI.Label>
      <div {{style max-width="fit-content"}}>
        <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
      </div>
      <hr class="shw-component-button-containers-divider" />
      <div {{style max-width="fit-content"}}>
        <HdsButton
          @icon="plus"
          @text="This is a very long text that should go on multiple lines"
        />
      </div>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContainers;
