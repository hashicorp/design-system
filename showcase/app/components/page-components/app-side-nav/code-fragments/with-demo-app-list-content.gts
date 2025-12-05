/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppSideNavList } from '@hashicorp/design-system-components/components';

interface CodeFragmentWithDemoAppListContentSignature {
  Args: {
    hasDashboardLink?: boolean;
  };
}

const CodeFragmentWithDemoAppListContent: TemplateOnlyComponent<CodeFragmentWithDemoAppListContentSignature> =
  <template>
    {{#if @hasDashboardLink}}
      <HdsAppSideNavList aria-label="Dashboard" as |SNL|>
        <SNL.Link @text="Dashboard" @icon="dashboard" @href="#" />
      </HdsAppSideNavList>
    {{/if}}

    <HdsAppSideNavList aria-label="Multiple items" as |SNL|>
      <SNL.Title>Services</SNL.Title>

      <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
      <SNL.Link @text="Consul" @icon="consul" @href="#" />
      <SNL.Link @text="Packer" @icon="packer" @href="#" />
      <SNL.Link @text="Vault" @icon="vault" @href="#" />
      <SNL.Link
        @text="Vault Secrets"
        @icon="vault-secrets-square"
        @badge="Alpha"
        @href="#"
      />
      <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
      <SNL.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
      <SNL.Link
        @text="Waypoint"
        @icon="waypoint"
        @badge="Alpha"
        @hasSubItems={{true}}
        @href="#"
      />

      <SNL.Title>Default Org</SNL.Title>

      <SNL.Link @text="HashiCorp Virtual Networks" @icon="network" @href="#" />
      <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
      <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
      <SNL.Link @text="Settings" @icon="settings" @href="#" />
    </HdsAppSideNavList>
  </template>;

export default CodeFragmentWithDemoAppListContent;
