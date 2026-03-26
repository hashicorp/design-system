import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextBody,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody @tag="div" @size="200" @color="strong">
    <p>This is some generic text in a paragraph.</p>
    <ul>
      <li>this list item contains some
        <strong>strong</strong>
        and
        <em>em</em>
        tags</li>
      <li>this list item contains a
        <HdsLinkInline @href="#">link</HdsLinkInline></li>
    </ul>
    <p>This is also some generic text in a paragraph.</p>
  </HdsTextBody>
</template>;

export default LocalComponent;
