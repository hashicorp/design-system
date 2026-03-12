import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import {
  HdsFormRadioCardGroup,
  HdsForm,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  onChange = (event: Event) => {
    const control = event.target as HTMLElement;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group?.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      .closest('.hds-form-radio-card')
      ?.classList.add('hds-form-radio-card--checked');
  };

  <template>
    <HdsForm as |FORM|>
      <FORM.Section>
        <HdsFormRadioCardGroup
          @isRequired={{true}}
          @name="radio-card-layout-required"
          as |G|
        >
          <G.Legend>Allow this source connect to the destination</G.Legend>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Admin</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Read</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Write</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
        </HdsFormRadioCardGroup>

        <HdsFormRadioCardGroup
          @isOptional={{true}}
          @name="radio-card-layout-optional"
          as |G|
        >
          <G.Legend>Allow this source connect to the destination</G.Legend>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Admin</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Read</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
          <G.RadioCard {{on "change" this.onChange}} as |R|>
            <R.Label>Write</R.Label>
            <R.Description>Grants full admin capabilities for this project.</R.Description>
          </G.RadioCard>
        </HdsFormRadioCardGroup>
      </FORM.Section>
    </HdsForm>
  </template>
}
