import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextBody,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody @tag="p" @size="300">This text contains some
    <strong>strong</strong>
    and
    <em>em</em>
    tags, a
    <HdsLinkInline @href="#">link</HdsLinkInline>.</HdsTextBody>
</template>;

export default LocalComponent;
