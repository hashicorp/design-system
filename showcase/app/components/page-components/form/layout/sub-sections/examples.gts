/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwLabel from 'showcase/components/shw/label';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import MockAppMainGenericFormPartialsAddPolicy from 'showcase/components/mock/app/main/generic-form/partials/add-policy';

import {
  HdsAlert,
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormRadioGroup,
  HdsFormSelectField,
  HdsFormTextareaField,
  HdsFormTextInputField,
  HdsFormToggleField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwTextH2>Examples of forms</ShwTextH2>

  <ShwTextH4 @tag="h3">Simple forms</ShwTextH4>

  <ShwLabel>With just fields</ShwLabel>

  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Group name</F.Label>
        <F.HelperText>Valid characters include ASCII letters, numbers, as well
          as spaces, periods (.), dashes (-), and underscores (_).</F.HelperText>
      </HdsFormTextInputField>
      <HdsFormTextInputField @isOptional={{true}} as |F|>
        <F.Label>Group description</F.Label>
        <F.HelperText>A brief description can help others understand this
          group's purpose</F.HelperText>
      </HdsFormTextInputField>
    </FORM.Section>
  </HdsForm>

  <ShwDivider @level={{2}} />

  <ShwLabel>With just fields and actions</ShwLabel>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Project name</F.Label>
        <F.HelperText>
          <ul {{style margin="0" padding-left="15px"}}>
            <li>Valid characters include ASCII letters, numbers, spaces, as well
              as dashes (-), and underscores (_).</li>
            <li>Cannot begin or end with spaces.</li>
          </ul>
        </F.HelperText>
        <F.CharacterCount @minLength={{3}} />
      </HdsFormTextInputField>
      <HdsFormTextareaField @isOptional={{true}} as |F|>
        <F.Label>Project description</F.Label>
        <F.HelperText>Help others understand what this project's purpose is</F.HelperText>
        <F.CharacterCount @maxLength={{256}} />
      </HdsFormTextareaField>
    </FORM.Section>
    <FORM.Footer>
      <HdsButtonSet>
        <HdsButton @color="primary" @text="Create project" type="submit" />
        <HdsButton @color="secondary" @text="Cancel" @href="#" />
      </HdsButtonSet>
    </FORM.Footer>
  </HdsForm>

  <ShwDivider @level={{2}} />

  <ShwLabel>With extra alert before the actions</ShwLabel>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Cluster name</F.Label>
        <F.HelperText>Provide a meaningful name for your cluster</F.HelperText>
      </HdsFormTextInputField>
      <HdsFormSelectField as |F|>
        <F.Label>Cluster type</F.Label>
        <F.HelperText>What type of cluster do you need</F.HelperText>
        <F.Options>
          <option value=""></option>
          <option value="foo">foo</option>
          <option value="bar">bar</option>
          <option value="baz">baz</option>
        </F.Options>
      </HdsFormSelectField>
    </FORM.Section>

    <HdsAlert @color="highlight" @icon="info-fill" @type="compact" as |A|>
      <A.Description>Clusters are scoped to a single project for now and cannot
        connect to other clusters in other projects.</A.Description>
    </HdsAlert>

    <FORM.Footer>
      <HdsButtonSet>
        <HdsButton @color="primary" @text="Create cluster" type="submit" />
        <HdsButton @color="secondary" @text="Cancel" @href="#" />
      </HdsButtonSet>
    </FORM.Footer>
  </HdsForm>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Forms with headers</ShwTextH4>

  <ShwLabel>Main header with title/description</ShwLabel>
  <HdsForm as |FORM|>
    <FORM.Header>
      <FORM.HeaderTitle @tag="h2">Auth Token TTL</FORM.HeaderTitle>
      <FORM.HeaderDescription>
        Edit the auth token TTL issued by Boundary controllers. Changes are not
        immediate, and will only affect new sessions.
      </FORM.HeaderDescription>
    </FORM.Header>
    <FORM.Section>
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Time to Live</F.Label>
        <F.HelperText>Maximum time to live for all auth tokens, globally, in
          hours (defaults to {ttl}).</F.HelperText>
      </HdsFormTextInputField>
      <HdsFormTextInputField @isOptional={{true}} as |F|>
        <F.Label>Time to Stale</F.Label>
        <F.HelperText>Maximum time for inactivity for all auth tokens, globally,
          in hours (defaults to 24 hours).</F.HelperText>
      </HdsFormTextInputField>
    </FORM.Section>
    <FORM.Footer>
      <HdsButtonSet>
        <HdsButton @color="primary" @text="Save" type="submit" />
        <HdsButton @color="secondary" @text="Cancel" @href="#" />
      </HdsButtonSet>
    </FORM.Footer>
  </HdsForm>

  <ShwDivider @level={{2}} />

  <ShwLabel>Main header + section headers</ShwLabel>
  <HdsForm as |FORM|>
    <FORM.Header>
      <FORM.HeaderTitle @size="400" @tag="h2">Cluster details</FORM.HeaderTitle>
      <HdsAlert @icon="info-fill" @type="compact" as |A|>
        <A.Description>You are creating a stand-alone cluster. If you want to
          create a secondary cluster in a federated set of clusters, go to the
          primary cluster and select the Federation tab.</A.Description>
      </HdsAlert>
    </FORM.Header>
    <FORM.Separator />
    <FORM.Section>
      <FORM.SectionHeader>
        <FORM.SectionHeaderTitle @tag="h3">Cluster customization</FORM.SectionHeaderTitle>
      </FORM.SectionHeader>
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Cluster ID</F.Label>
        <F.HelperText>Must be a unique set of 3-36 characters. May include
          numbers, hyphens, and lowercase letters. Must start with a letter and
          end with a letter or number.</F.HelperText>
        <F.CharacterCount @minLength={{3}} @maxLength={{36}} />
      </HdsFormTextInputField>
      <HdsAlert @icon="info-fill" @type="compact" as |A|>
        <A.Description>We’d like your feedback on our cluster tiers, size, and
          billing plan offerings. Provide your feedback
          <HdsLinkInline @href="#">here</HdsLinkInline></A.Description>
      </HdsAlert>
      <HdsFormSelectField @isRequired={{true}} as |F|>
        <F.Label>Cluster tier</F.Label>
        <F.HelperText>Compare features across tiers in more detail in
          <HdsLinkInline @href="#">our documentation</HdsLinkInline>.</F.HelperText>
        <F.Options>
          <option value="development">Development</option>
          <option value="standard">Standard</option>
          <option value="plus">Plus</option>
        </F.Options>
      </HdsFormSelectField>
      <FORM.Separator />
      <FORM.SectionHeader>
        <FORM.SectionHeaderTitle @tag="h3">Cluster accessibility</FORM.SectionHeaderTitle>
        <FORM.SectionHeaderDescription>
          Configure network access to your cluster. Internal (RPC and Gossip)
          communication is always secure to Consul servers over a private
          peering or a transit gateway connection. For increased security, limit
          the IP addresses allowed to connect using the “Allow select IPs only”
          section below.
        </FORM.SectionHeaderDescription>
      </FORM.SectionHeader>
      <HdsFormRadioGroup as |G|>
        <G.RadioField checked={{true}} as |F|>
          <F.Label>Private</F.Label>
          <F.HelperText>Most secure, the clusters endpoint is private and not
            accessible to the public internet, only connected networks have
            access to the cluster's endpoint via HTTPS or gRPC.</F.HelperText>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Public</F.Label>
          <F.HelperText>Less secure, the clusters endpoint is accessible from
            any connection outside of your network via HTTPS.</F.HelperText>
        </G.RadioField>
      </HdsFormRadioGroup>
      <HdsFormToggleField as |F|>
        <F.Label>Allow select IPs only</F.Label>
        <F.HelperText>When enabled, any address ranges not included in the IP
          allowlist will be denied network access. Input up to 3 IPV4 address
          ranges in CIDR notation.</F.HelperText>
      </HdsFormToggleField>
    </FORM.Section>
  </HdsForm>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Forms with different types of content</ShwTextH4>

  <ShwLabel>Mixed section widths</ShwLabel>
  <HdsForm>
    {{! Here we use Mock::App components to avoid too much code repetition  }}
    <MockAppMainGenericFormPartialsAddPolicy />
  </HdsForm>
</template>;

export default SubSectionExamples;
