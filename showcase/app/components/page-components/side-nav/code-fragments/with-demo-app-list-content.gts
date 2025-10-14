/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsSideNavList } from '@hashicorp/design-system-components/components';

interface CodeFragmentWithDemoAppListContentSignature {
  Args: {
    hasDashboardLink?: boolean;
  };
}

const CodeFragmentWithDemoAppListContent: TemplateOnlyComponent<CodeFragmentWithDemoAppListContentSignature> =
  <template>
    {{#if @hasDashboardLink}}
      <HdsSideNavList aria-label="Dashboard" as |SNL|>
        <SNL.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
      </HdsSideNavList>
    {{/if}}

    <HdsSideNavList aria-label="Services" as |SNL|>
      <SNL.Title>Services</SNL.Title>
      <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
      <SNL.Link @text="Consul" @icon="consul" @href="#" />
      <SNL.Link @text="Packer" @icon="packer" @href="#" />
      <SNL.Link @text="Vault" @icon="vault" @href="#" />
      <SNL.Link @text="Vault Secrets" @icon="vault-secrets-square" @href="#" />
      <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
      <SNL.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
      <SNL.Link
        @text="Waypoint"
        @icon="waypoint"
        @badge="Alpha"
        @hasSubItems={{true}}
      />
    </HdsSideNavList>

    <HdsSideNavList aria-label="Organization" as |SNL|>
      <SNL.Title>Default Org</SNL.Title>
      <SNL.Link @text="HashiCorp Virtual Networks" @icon="network" @href="#" />
      <SNL.Link
        @text="Access control (IAM)"
        @icon="users"
        @href="#"
        @hasSubItems={{true}}
      />
      <SNL.Link
        @text="Billing"
        @icon="credit-card"
        @href="#"
        @hasSubItems={{true}}
      />
      <SNL.Link
        @text="Settings"
        @icon="settings"
        @href="#"
        @hasSubItems={{true}}
      />
      <SNL.Link
        @href="#"
        @isHrefExternal={{true}}
        @icon="guide"
        @text="Documentation"
      />
    </HdsSideNavList>
  </template>;

export default CodeFragmentWithDemoAppListContent;
