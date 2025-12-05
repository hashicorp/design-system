/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsButton } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>display: inline-block</code></SGI.Label>
      <ShwFlex as |SF|>
        <SF.Item>
          <div {{style display="inline-block"}}>
            <HdsButton
              @icon="plus"
              @iconPosition="leading"
              @text="Lorem ipsum"
            />
          </div>
        </SF.Item>
        <SF.Item>
          <div {{style display="inline-block"}}>
            <HdsButton
              @icon="plus"
              @text="This is a very long text that should go on multiple lines"
            />
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>display: inline-flex</code></SGI.Label>
      <ShwFlex as |SF|>
        <SF.Item>
          <div {{style display="inline-flex"}}>
            <HdsButton
              @icon="plus"
              @iconPosition="leading"
              @text="Lorem ipsum"
            />
          </div>
        </SF.Item>
        <SF.Item>
          <div {{style display="inline-flex"}}>
            <HdsButton
              @icon="plus"
              @text="This is a very long text that should go on multiple lines"
            />
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>flex-grow: 0</code></SGI.Label>
      <ShwFlex as |SF|>
        <SF.Item>
          <div {{style display="flex"}}>
            <div {{style flex-grow="0"}}>
              <HdsButton
                @icon="plus"
                @iconPosition="leading"
                @text="Lorem ipsum"
              />
            </div>
          </div>
        </SF.Item>
        <SF.Item>
          <div {{style display="flex"}}>
            <div {{style flex-grow="0"}}>
              <HdsButton
                @icon="plus"
                @text="This is a very long text that should go on multiple lines"
              />
            </div>
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
    <SG.Item @forceMinWidth={{true}} as |SGI|>
      <SGI.Label>Parent with <code>max-width: fit-content</code></SGI.Label>
      <ShwFlex as |SF|>
        <SF.Item>
          <div {{style max-width="fit-content"}}>
            <HdsButton
              @icon="plus"
              @iconPosition="leading"
              @text="Lorem ipsum"
            />
          </div>
        </SF.Item>
        <SF.Item>
          <div {{style max-width="fit-content"}}>
            <HdsButton
              @icon="plus"
              @text="This is a very long text that should go on multiple lines"
            />
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContainers;
