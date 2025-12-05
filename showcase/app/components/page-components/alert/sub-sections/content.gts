/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsAlert,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>A simple title</A.Title>
            <A.Description>A simple description text</A.Description>
          </HdsAlert>
        </SF.Item>

        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>An alert with just a title and no description text.</A.Title>
          </HdsAlert>
        </SF.Item>
        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Description>An alert with no title and just a description text</A.Description>
          </HdsAlert>
        </SF.Item>

        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>An alert with a very long title and a long description text
              that should go on multiple lines</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque erat elit, lacinia at magna eget, porttitor
              lobortis nulla.</A.Description>
          </HdsAlert>
        </SF.Item>
      </ShwFlex>
    </SG.Item>

    <SG.Item>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>An alert with a rich description (HTML)</A.Title>
            <A.Description>Using the
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
              <a href="#">inline links</a>.</A.Description>
          </HdsAlert>
        </SF.Item>

        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>Multiple lines of description using more than one
              'description' contextual component</A.Title>
            <A.Description>This is the first line of description, yielded to a
              <code>A.Description</code>
              contextual component.</A.Description>
            <A.Description>And this is the second line of description, yielded
              to another
              <code>A.Description</code>
              contextual component.</A.Description>
          </HdsAlert>
        </SF.Item>

        <SF.Item>
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>An alert with extra/custom content</A.Title>
            <A.Description>In special cases, you can pass extra content to the
              alert using the
              <code>A.Generic</code>
              contextual component.</A.Description>
            <A.Generic>
              <ShwPlaceholder @text="some generic content" @height="50" />
            </A.Generic>
          </HdsAlert>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>With different types of links as content</ShwTextH3>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <HdsAlert @type="inline" @color="success" as |A|>
        <A.Title>HTML link compared to
          <code>HdsLink</code>
          in the description</A.Title>
        <A.Description>
          Description with
          <a href="#">HTML link</a>
          compared with
          <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
          and
          <HdsLinkInline @href="#" @color="secondary">Secondary HdsLinkInline</HdsLinkInline>.
        </A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="compact" @color="success" as |A|>
        <A.Title>An alert with HTML link compared to
          <code>HdsLink</code>
          in Description</A.Title>
        <A.Description>
          Compact alert with
          <a href="#">HTML link</a>
          compared with
          <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
          and
          <HdsLinkInline @href="#" @color="secondary">Secondary HdsLinkInline</HdsLinkInline>.
        </A.Description>
      </HdsAlert>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>With a custom title tag</ShwTextH3>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <HdsAlert @type="inline" @color="neutral" as |A|>
        <A.Title @tag="h1">Lorem ipsum dolor</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="page" @color="neutral" as |A|>
        <A.Title @tag="h2">Lorem ipsum dolor</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="compact" @color="neutral" as |A|>
        <A.Title @tag="h3">Without the dismiss button (default)</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
      </HdsAlert>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContent;
