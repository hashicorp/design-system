/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';

<template>
  <ShwTextH2>Component Sandbox — CDS Accordion</ShwTextH2>

  <cds-accordion>
    <cds-accordion-item title="What is Helios?">
      <p>Helios is the HashiCorp Design System — a collection of accessible, reusable components.</p>
    </cds-accordion-item>
    <cds-accordion-item open title="What is Carbon?">
      <p>Carbon is IBM's open-source design system for digital products and experiences.</p>
    </cds-accordion-item>
    <cds-accordion-item title="Why migrate?">
      <p>To align with IBM's design language and benefit from Carbon's accessibility and component coverage.</p>
    </cds-accordion-item>
  </cds-accordion>

  <ShwDivider />
</template>
