import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

import DocLayout from 'website/components/doc/layout/index';

const LocalComponent: TemplateOnlyComponent = <template>
  <DocLayout @direction="vertical" @align="justify" {{style height="400px"}}>
    <HdsIconTile @color="neutral" @icon="user" />
    <HdsIconTile @color="boundary" @icon="crosshair" />
    <HdsIconTile @color="consul" @icon="server-cluster" />
    <HdsIconTile @color="nomad" @icon="briefcase" />
    <HdsIconTile @color="packer" @icon="layers" />
  </DocLayout>
</template>;

export default LocalComponent;
