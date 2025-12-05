/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsInteractive } from '@hashicorp/design-system-components/components';

const SubSectionElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Generated elements</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Label><code>&lt;button&gt;</code>
      (with no @route or @href provided / default)</SF.Label>
    <SF.Item>
      <HdsInteractive>This is a button (default)</HdsInteractive>
    </SF.Item>
  </ShwFlex>

  <ShwFlex id="local-anchor" as |SF|>
    <SF.Label><code>&lt;a&gt;</code>
      (with
      <code>@href</code>
      argument)</SF.Label>
    <SF.Item>
      <HdsInteractive @href="http://google.com">This is an external
        <code>&lt;a&gt;</code>
        link (default)</HdsInteractive>
      <br />
      <HdsInteractive @href="#local-anchor" @isHrefExternal={{false}}>This is an
        internal
        <code>&lt;a&gt;</code>
        link</HdsInteractive>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label><code>&lt;LinkTo&gt;</code>
      (with
      <code>@route</code>
      argument)</SF.Label>
    <SF.Item>
      <HdsInteractive @route="index">This is a
        <code>&lt;LinkTo&gt;</code>
        link</HdsInteractive>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label><code>&lt;LinkToExternal&gt;</code>
      (with
      <code>@route</code>
      argument and
      <code>@isRouteExternal</code>
      set to true)</SF.Label>
    <SF.Item>
      {{!-- <HdsInteractive @route="index" @isRouteExternal={{true}}>This is a <code>&lt;LinkToExternal&gt;</code> link</HdsInteractive> --}}
      <pre
      >⚠️ We can't render this component in this application (it will work only on Ember engines).</pre>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionElements;
