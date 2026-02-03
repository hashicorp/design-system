import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import {
  HdsForm,
  HdsLinkInline,
  HdsFormTextInputField,
  HdsFormRadioCardGroup,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  onChange = (event: Event) => {
    const control = event.target as HTMLElement;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group?.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      ?.closest('.hds-form-radio-card')
      ?.classList.add('hds-form-radio-card--checked');
  };

  <template>
    <HdsForm as |FORM|>
      <FORM.Header as |FH|>
        <FH.Title @tag="h2">Add policy</FH.Title>
        <FH.Description>
          Please specify which policy you would like to assign to your cluster.
          Read more about policies in our
          <HdsLinkInline @href="#">documentation</HdsLinkInline>.
        </FH.Description>
      </FORM.Header>

      <FORM.Section>
        <HdsFormTextInputField name="demo-secret-id" as |F|>
          <F.Label>Secret ID</F.Label>
          <F.HelperText>
            Create a token within your self-managed cluster and attach only the
            “builtin/global-read-only” policy to it. Once complete, save the
            token, copy its secret ID from the token list, and insert it below.
          </F.HelperText>
        </HdsFormTextInputField>
      </FORM.Section>

      <FORM.Section @isFullWidth={{true}}>
        <HdsFormRadioCardGroup
          @name="demo-radio-card-policies-example"
          @alignment="center"
          as |G|
        >
          <G.Legend>Policy framework</G.Legend>
          <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
            <R.Icon @name="terraform" />
            <R.Label>Terraform policy</R.Label>
            <R.Badge @text="New" @color="highlight" />
            <R.Description>
              Write policies in HCL that directly reference Terraform resources
              to enforce your compliance and security requirements.
            </R.Description>
          </G.RadioCard>

          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Icon @name="hashicorp" />
            <R.Label>Sentinel</R.Label>
            <R.Description>
              Write policies imperatively for attribute-based access control to
              enforce compliance and security requirements.
            </R.Description>
          </G.RadioCard>

          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Icon @name="opa" />
            <R.Label>Open Policy Agent (OPA)</R.Label>
            <R.Description>
              Open-source, general-purpose policy engine that allows you to
              enforce fine-grained access control and decision-making across
              cloud-native environments.
            </R.Description>
          </G.RadioCard>
        </HdsFormRadioCardGroup>
      </FORM.Section>

      <FORM.Section>
        <HdsFormTextInputField as |F|>
          <F.Label>Policy set name</F.Label>
          <F.HelperText>
            Valid characters include ASCII letters, numbers, as well as spaces,
            periods (.), dashes (-), and underscores (_).
          </F.HelperText>
        </HdsFormTextInputField>
      </FORM.Section>

      <FORM.Separator />

      <FORM.Section as |FS|>
        <FS.Header as |FSH|>
          <FSH.Title>Policy OPA </FSH.Title>
          <FSH.Description>
            Policy OPA is a governance rule that enforces specific access
            controls and compliance requirements within the organization‘s
            infrastructure.
          </FSH.Description>
        </FS.Header>

        <HdsFormTextInputField placeholder="e.g data.terraform.deny" as |F|>
          <F.Label>Query</F.Label>
          <F.HelperText>
            The rule expression that the policy will evaluate.
            <HdsLinkInline
              @href="https://www.terraform.io/cloud-docs/policy-enforcement/opa"
              @icon="external-link"
            >
              Learn more about defining OPA policies
            </HdsLinkInline>.
          </F.HelperText>
        </HdsFormTextInputField>
      </FORM.Section>

      <FORM.Footer as |FF|>
        <FF.ButtonSet>
          <HdsButton @text="Submit" type="submit" />
          <HdsButton @text="Cancel" @color="secondary" />
        </FF.ButtonSet>
      </FORM.Footer>
    </HdsForm>
  </template>
}
