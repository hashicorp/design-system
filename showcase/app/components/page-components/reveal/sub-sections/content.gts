/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsReveal,
  HdsAlert,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>On its own</ShwTextH3>

  <ShwFlex @direction="column" @gap="1.5rem" as |SF|>
    <SF.Item @label="With plain text content">
      <HdsReveal @text="Developer instructions">
        Leverage agile frameworks to provide a robust synopsis for high level
        overviews. Iterative approaches to corporate strategy foster
        collaborative thinking to further the overall value proposition.
        Organically grow the holistic world view of disruptive innovation via
        workplace diversity and empowerment.
      </HdsReveal>
    </SF.Item>

    <SF.Item @label="With HTML formatted content (containing alert & list)">
      <HdsReveal @text="Show me how">
        <HdsAlert @type="compact" as |A|>
          <A.Description>Instructions to add the verification record to your
            domain host</A.Description>
        </HdsAlert>
        <ol>
          <li>
            For the record type, select
            <b>TXT</b>.
          </li>
          <li>
            In the
            <b>Name/Host/Alias</b>
            field, enter
            <b>@</b>
            or leave blank. Your host might require you to enter your domain,
            which looks like
            <b>example.com</b>
          </li>
          <li>
            In the
            <b>Time to Live (TTL)</b>
            field, enter
            <b>86400</b>
            or leave the default.
          </li>
          <li>
            In the
            <b>Value/Answer/Destination</b>
            field, paste the verification record you copied.
          </li>
          <li>
            Save the record.
          </li>
        </ol>
      </HdsReveal>
    </SF.Item>

    <SF.Item @label="With interactive content">
      <HdsReveal @text="More options">
        See here for more info:
        <a
          href="https://www.hashicorp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >HashiCorp</a>
      </HdsReveal>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>Used next to other content</ShwTextH3>

  <ShwFlex @direction="column" @gap="1rem" as |SF|>
    <SF.Item @label="Used beneath a form input">
      <HdsFormTextInputField as |F|>
        <F.Label>Private subnet 1</F.Label>
        <F.HelperText>Ensure that the private subnets have access to the
          external network.
        </F.HelperText>
      </HdsFormTextInputField>
      <HdsReveal @text="Where can I find this?">
        <HdsAlert @type="compact" as |A|>
          <A.Description>Navigate to Subnets(1), if you already have subnet
            created for the VPC of choice, copy the Subnet ID(2). Otherwise,
            Create subnet(3) for chosen VPC.</A.Description>
        </HdsAlert>
        <p>
          <img
            src="/assets/images/avatar.png"
            alt="example"
            class="shw-max-width-100"
          />
        </p>
      </HdsReveal>
    </SF.Item>

    <SF.Item @label="With text above and below">
      <p class="hds-typography-body-300">
        Lorem ipsum dolor sit amet consectetur
      </p>
      <HdsReveal @text="More options">
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
      <p class="hds-typography-body-300">
        adipisicing elit. Doloremque blanditiis sapiente iste beatae voluptates
        voluptatum.
      </p>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContent;
