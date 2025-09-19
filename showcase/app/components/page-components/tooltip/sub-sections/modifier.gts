import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';

import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';
import {
  HdsButton,
  HdsLinkStandalone,
  HdsFormField,
} from '@hashicorp/design-system-components/components';

const SubSectionTooltip: TemplateOnlyComponent = <template>
  <ShwTextH2><code>hds-tooltip</code> modifier</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwTextH4>On its own</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="On a button">
      <HdsButton @text="Submit" {{hdsTooltip "Submit all your data"}} />
    </SF.Item>

    <SF.Item @label="On a link">
      <HdsLinkStandalone
        @icon="external-link"
        @iconPosition="trailing"
        @text="Acme Corp"
        @href="#"
        {{hdsTooltip "This link takes you to a 3rd party site"}}
      />
    </SF.Item>

    <SF.Item @label="On an input">
      <HdsFormField @layout="vertical" as |F|>
        <F.Label @controlId="tooltip-example-control-id">First Name</F.Label>
        <F.Control>
          <input
            type="text"
            value="Jane"
            id="tooltip-example-control-id"
            {{hdsTooltip "Enter only your first name"}}
          />
        </F.Control>
      </HdsFormField>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionTooltip;
