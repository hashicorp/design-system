import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

import DocLayout from 'website/components/doc/layout/index';

const LocalComponent: TemplateOnlyComponent = <template>
  <DocLayout @direction="vertical" @spacing="12px" @align="right">
    <HdsIconTile @color="neutral" @icon="user" />
    <HdsIconTile @color="boundary" @icon="crosshair" />
    <HdsIconTile @color="consul" @icon="server-cluster" />
    <HdsIconTile @color="nomad" @icon="briefcase" />
    <HdsIconTile @color="packer" @icon="layers" />
    <HdsIconTile @color="terraform" @icon="grid" />
    <HdsIconTile @color="vagrant" @icon="box" />
    <HdsIconTile @color="vault" @icon="key" />
    <HdsIconTile @color="waypoint" @icon="cloud-upload" />
  </DocLayout>
</template>;

export default LocalComponent;
