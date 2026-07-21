/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
// sandbox-001 applied: HdsButton → cds-button (confidence: 0.95)
// sandbox-003 applied: HdsLinkInline → cds-link (confidence: 0.92)
// sandbox-002 reverted: HdsText (pending visual verification)
// sandbox-004 applied: HdsAlert → cds-inline-notification (confidence: 0.75, approved)
// sandbox-005 applied: HdsIcon → cds-icon (confidence: 0.72, approved)
import { modifier } from 'ember-modifier';
import ArrowRight24 from '@carbon/icons/es/arrow--right/24.js';
import { HdsText } from '@hashicorp/design-system-components/components';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';

const setIcon = modifier((el: Element, [icon]: [unknown]) => {
  (el as HTMLElement & { icon: unknown }).icon = icon;
});

<template>
  {{! Button — migrated: sandbox-001 }}
  <ShwTextH2>Button</ShwTextH2>
  <cds-button>Click me</cds-button>

  <ShwDivider />

  {{! Text — reverted for visual verification }}
  <ShwTextH2>Text</ShwTextH2>
  <HdsText @tag="p" @size="200" @group="body">The quick brown fox jumps over the
    lazy dog.</HdsText>

  <ShwDivider />

  {{! Link::Inline — migrated: sandbox-003 }}
  <ShwTextH2>Link::Inline</ShwTextH2>
  <p>
    Learn more about the
    <cds-link href="https://helios.hashicorp.design">Helios Design System</cds-link>.
  </p>

  <ShwDivider />

  {{! Alert — migrated: sandbox-004 }}
  <ShwTextH2>Alert</ShwTextH2>
  <cds-inline-notification
    kind="info"
    title="Information"
    subtitle="This is an informational alert."
  ></cds-inline-notification>

  <ShwDivider />

  {{! Icon — migrated: sandbox-005 }}
  <ShwTextH2>Icon</ShwTextH2>
  <cds-icon size="24" {{setIcon ArrowRight24}}></cds-icon>
</template>
