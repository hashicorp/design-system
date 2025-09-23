import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsLayoutFlex,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const SubSectionDisplay: TemplateOnlyComponent = <template>
  <ShwTextH2>Display</ShwTextH2>

  <ShwFlex @gap="2rem" as |SF|>
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |isInline|}}
        <SF.Item
          @label={{if isInline "inline-flex (isInline=true)" "flex (default)"}}
          class="shw-layout-flex-example-tint-flex-items"
        >
          <HdsTextBody @size="200" @tag="p">
            Lorem
            <HdsLayoutFlex @isInline={{isInline}}>
              <ShwPlaceholder @text="#1" @width="24" @height="24" />
              <ShwPlaceholder @text="#2" @width="24" @height="24" />
              <ShwPlaceholder @text="#3" @width="24" @height="24" />
              <ShwPlaceholder @text="#4" @width="24" @height="24" />
            </HdsLayoutFlex>
            sit amet
            <HdsLayoutFlex @isInline={{isInline}}>
              <ShwPlaceholder @text="#A" @width="24" @height="24" />
              <ShwPlaceholder @text="#B" @width="24" @height="24" />
              <ShwPlaceholder @text="#C" @width="24" @height="24" />
              <ShwPlaceholder @text="#D" @width="24" @height="24" />
            </HdsLayoutFlex>
            elit.
          </HdsTextBody>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>
</template>;

export default SubSectionDisplay;
