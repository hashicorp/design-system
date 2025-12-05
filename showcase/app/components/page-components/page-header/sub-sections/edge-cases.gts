/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsPageHeader,
  HdsBadge,
  HdsButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const SubSectionEdgeCases: TemplateOnlyComponent = <template>
  <ShwTextH2>Overflow examples and edge cases</ShwTextH2>

  <ShwTextBody @tag="p">
    These examples are meant to showcase the flexiblity, responsiveness, and
    potential gotchas related to the layout and fluidity of the component.
  </ShwTextBody>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Long title">
      <HdsPageHeader as |PH|>
        <PH.Title>Boundary cluster access control and clusters</PH.Title>
        <PH.IconTile @icon="boundary-color" @color="boundary" />
        <PH.Actions>
          <HdsDropdown as |D|>
            <D.ToggleButton @text="Manage users" @color="secondary" />
            <D.Interactive @icon="user">Assign roles</D.Interactive>
            <D.Interactive @icon="edit">Batch edit</D.Interactive>
            <D.Interactive @icon="trash">Delete user</D.Interactive>
          </HdsDropdown>
          <HdsButton @text="Add user" @icon="plus" @iconPosition="leading" />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Long title + badge">
      <HdsPageHeader as |PH|>
        <PH.Title>
          Page title with a very very very very long string that can span
          multiple lines
        </PH.Title>
        <PH.IconTile @logo="vagrant" />
        <PH.Badges>
          <HdsBadge @text="Wrapping badge" @icon="mic" @color="critical" />
        </PH.Badges>
        <PH.Actions>
          <HdsButton
            @text="Get started"
            @icon="terminal-screen"
            @iconPosition="trailing"
          />
        </PH.Actions>
      </HdsPageHeader>

      <ShwTextBody @tag="p">
        In the case of a badge, the title and badge will wrap if the available
        space is exceeded.
      </ShwTextBody>
    </SF.Item>
    <SF.Item @label="Non-breaking Title/Subtitle/Description + badge">
      <HdsPageHeader as |PH|>
        <PH.Title>
          Pagetitlewithaveryveryveryverylongnonbreakingstringthatcanspanmultiplelines
        </PH.Title>
        <PH.Subtitle
        >Subtitlewithaveryveryveryveryveryveryveryveryveryveryveryveryveryveveryveryveryveryveryveryveryveryveryveryveryveryryveryverylongnonbreakingstringthatcanspanmultiplelines</PH.Subtitle>
        <PH.Description
        >Descriptionwithaveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylongnonbreakingstringthatcanspanmultiplelines.</PH.Description>
        <PH.IconTile @logo="vagrant" />
        <PH.Badges>
          <HdsBadge @text="Wrapping badge" @icon="mic" @color="critical" />
        </PH.Badges>
        <PH.Actions>
          <HdsButton
            @text="Get started"
            @icon="terminal-screen"
            @iconPosition="trailing"
          />
        </PH.Actions>
      </HdsPageHeader>

      <ShwTextBody @tag="p">
        In the case of non-breaking text the long string will be forced to wrap
        using the
        <code>break-word</code>
        option.
      </ShwTextBody>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;
export default SubSectionEdgeCases;
