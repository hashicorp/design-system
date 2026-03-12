import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormRadioCardGroup } from '@hashicorp/design-system-components/components';

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
    <HdsFormRadioCardGroup @name="radio-card-custom-example" as |G|>
      <G.Legend>Cluster type</G.Legend>
      <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
        <R.Label>HCP-managed Consul</R.Label>
        <R.Badge @text="6 clusters left" />
        <R.Generic>
          <ul class="doc-radio-card-list-demo">
            <li class="hds-typography-display-100">Connect workloads in your
              cloud provider network with HCP</li>
            <li class="hds-typography-display-100">Offload Consul operations to
              Hashicorp Experts</li>
          </ul>
        </R.Generic>
      </G.RadioCard>
      <G.RadioCard {{on "change" this.onChange}} as |R|>
        <R.Label>Self-managed Consul</R.Label>
        <R.Badge @text="5 clusters left" />
        <R.Badge @text="Kubernetes only" @icon="kubernetes" />
        <R.Generic>
          <ul class="doc-radio-card-list-demo">
            <li class="hds-typography-display-100">Multi-cloud artifact registry</li>
            <li class="hds-typography-display-100">Golden images workflow</li>
            <li class="hds-typography-display-100">Terraform Cloud integration</li>
            <li class="hds-typography-display-100">10 free images/month</li>
            <li class="hds-typography-display-100">250 free requests/month</li>
          </ul>
        </R.Generic>
      </G.RadioCard>
    </HdsFormRadioCardGroup>
  </template>
}
