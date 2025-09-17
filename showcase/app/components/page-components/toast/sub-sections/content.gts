/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import NOOP from 'showcase/utils/noop';

import {
  HdsToast,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Title>A simple title</T.Title>
            <T.Description>A simple description text</T.Description>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Title>A toast with a title and no description text.</T.Title>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Description>A toast with no title and just a description text</T.Description>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Title>A toast with a very long title and a long description text
              that should go on multiple lines</T.Title>
            <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque erat elit, lacinia at magna eget, porttitor
              lobortis nulla.</T.Description>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @color="success" as |A|>
            <A.Title>A toast comparing different types of links in the
              description</A.Title>
            <A.Description>
              Description with
              <a href="#">HTML link</a>
              compared with
              <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
              and
              <HdsLinkInline @href="#" @color="secondary">Secondary
                HdsLinkInline</HdsLinkInline>.
            </A.Description>
          </HdsToast>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
    <SG.Item>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Title>A toast with a rich description (HTML)</T.Title>
            <T.Description>Using the
              <code>A.Description</code>
              contextual component it's possible to have content that contains
              HTML tags, like
              <strong>strong text</strong>
              and
              <em>emphasized text</em>
              as well as
              <code>code</code>,
              <pre>pre</pre>
              and
              <a href="#">inline links</a>.</T.Description>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @onDismiss={{NOOP}} @color="success" as |T|>
            <T.Title>Multiple lines of description using more than one
              'description' contextual component</T.Title>
            <T.Description>This is the first line of description, yielded to a
              <code>A.Description</code>
              contextual component.</T.Description>
            <T.Description>And this is the second line of description, yielded
              to another
              <code>A.Description</code>
              contextual component.</T.Description>
          </HdsToast>
        </SF.Item>
        <SF.Item>
          <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
            <T.Title>A toast with extra/custom content</T.Title>
            <T.Description>In special cases, you can pass extra content to the
              toast using the
              <code>A.Generic</code>
              contextual component.</T.Description>
            <T.Generic>
              <ShwPlaceholder @text="some generic content" @height="50" />
            </T.Generic>
          </HdsToast>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContent;
