/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsAlert,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import NOOP from 'showcase/utils/noop';
import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert/index';

const AlertIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Alert Component"}}

  <ShwTextH1>Alert</ShwTextH1>

  <section data-test-percy>
    <ShwTextBody>
      👀 Note: the compact alert is borderless, but shown with a dotted border
      throughout the “Showcase” for clarity.
    </ShwTextBody>

    <ShwTextH2>Type</ShwTextH2>

    {{#each TYPES as |type|}}
      <ShwTextBody>{{capitalize type}}</ShwTextBody>
      <ShwFlex as |SF|>
        <SF.Item @grow={{true}}>
          <HdsAlert @type={{type}} as |A|>
            <A.Title>Lorem ipsum</A.Title>
            <A.Description>Lorem ipsum dolor sit amet.</A.Description>
          </HdsAlert>
        </SF.Item>
      </ShwFlex>
    {{/each}}

    <ShwTextH2>Color</ShwTextH2>

    <ShwGrid @columns={{3}} as |SG|>
      {{#each COLORS as |color|}}
        {{#each TYPES as |type|}}
          <SG.Item @label="{{capitalize color}} / {{capitalize type}}">
            <HdsAlert @type={{type}} @color={{color}} as |A|>
              <A.Title>Lorem ipsum dolor</A.Title>
              <A.Description>This is the
                <em>{{type}}</em>
                alert with
                <em>{{color}}</em>
                color.</A.Description>
            </HdsAlert>
          </SG.Item>
        {{/each}}
      {{/each}}
    </ShwGrid>

    <ShwTextH2>Icon</ShwTextH2>

    <ShwGrid @columns={{3}} as |SG|>
      <SG.Item>
        <HdsAlert @type="inline" @color="highlight" as |A|>
          <A.Title>Default icon</A.Title>
          <A.Description>Lorem ipsum dolor sit amet.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="highlight" @icon="meh" as |A|>
          <A.Title>With icon override</A.Title>
          <A.Description>Lorem ipsum dolor sit amet.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="highlight" @icon="running" as |A|>
          <A.Title>With animated icon</A.Title>
          <A.Description>Lorem ipsum dolor sit amet.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="highlight" @icon={{false}} as |A|>
          <A.Title>Without icon</A.Title>
          <A.Description>Lorem ipsum dolor sit amet.</A.Description>
        </HdsAlert>
      </SG.Item>
    </ShwGrid>

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
              <A.Title>An alert with a very long title and a long description
                text that should go on multiple lines</A.Title>
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
            <code>Hds::Link</code>
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
            <code>Hds::Link</code>
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
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="page" @color="neutral" as |A|>
          <A.Title @tag="h2">Lorem ipsum dolor</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="compact" @color="neutral" as |A|>
          <A.Title @tag="h3">Without the dismiss button (default)</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
    </ShwGrid>

    <ShwTextH2>Actions</ShwTextH2>

    <ShwGrid @columns={{2}} as |SG|>
      <SG.Item>
        <HdsAlert @type="inline" @color="warning" as |A|>
          <A.Title>Action passed as yielded component</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
          <A.Button @text="Action" @color="secondary" />
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="warning" as |A|>
          <A.Title>With multiple actions passed as yielded components</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
          <A.Button @text="Secondary" @color="secondary" />
          <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
          <A.LinkStandalone
            @icon="plus"
            @text="Standalone"
            @href="#"
            @color="secondary"
          />
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="warning" as |A|>
          <A.Title>With actions and custom content</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.</A.Description>
          <A.Button @text="Action" @color="secondary" />
          <A.LinkStandalone
            @icon="plus"
            @text="Action"
            @href="#"
            @color="secondary"
          />
          <A.Generic>
            <div
              class="shw-component-alert-sample-custom-content-after-actions"
            >This for example could be extra text, specific for a special use
              case.</div>
          </A.Generic>
        </HdsAlert>
      </SG.Item>
    </ShwGrid>

    <ShwTextH2>Dismiss</ShwTextH2>

    <ShwGrid @columns={{2}} as |SG|>
      <SG.Item>
        <HdsAlert @type="inline" @color="neutral" as |A|>
          <A.Title>Without the dismiss button (default)</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert
          @type="inline"
          @color="neutral"
          {{! TODO: understand if we can use a generic helper - see https://hashicorp.slack.com/archives/C11JCBJTW/p1648751235987409 }}
          @onDismiss={{NOOP}}
          as |A|
        >
          <A.Title>With the dismiss button</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert
          @type="inline"
          @color="neutral"
          @icon={{false}}
          @onDismiss={{NOOP}}
          as |A|
        >
          <A.Title>With the dismiss button and no icon</A.Title>
          <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</A.Description>
        </HdsAlert>
      </SG.Item>
      <SG.Item>
        <HdsAlert @type="inline" @color="neutral" @onDismiss={{NOOP}} as |A|>
          <A.Description>With the dismiss button and no title</A.Description>
        </HdsAlert>
      </SG.Item>
    </ShwGrid>
  </section>
</template>;

export default AlertIndex;
