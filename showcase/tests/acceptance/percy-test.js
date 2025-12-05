/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, click, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';
import config from 'showcase/config/environment';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  if (config.emberTryScenario) {
    console.log('Not running percy in ember-try');
    return;
  }

  test('Take percy snapshots', async function (assert) {
    // we have a lot of tests to run and screenshots to take,
    // so we need to increase the timeout for this specific test (default is 60000ms)
    assert.timeout(180000);

    await visit('/foundations/typography');
    await percySnapshot('Typography');

    await visit('/foundations/elevation');
    await percySnapshot('Elevation');

    await visit('/foundations/focus-ring');
    await percySnapshot('FocusRing');

    // Take snapshots for English, Spanish, and None (Fallback) translations
    await visit('/internationalization/translation');
    await percySnapshot('Translation - English');
    await fillIn('.hds-form-select', 'es-es');
    await percySnapshot('Translation - Spanish');
    await fillIn('.hds-form-select', '');
    await percySnapshot('Translation - None (Fallback)');

    // for the breakpoints we use a frameless page
    await visit(
      '/foundations/breakpoints/frameless/demo-viewport-breakpoints-visualization',
    );
    await percySnapshot('Breakpoints');

    await visit('/components/accordion');
    await percySnapshot('Accordion');

    await visit('/components/advanced-table');
    await percySnapshot('AdvancedTable');

    await visit('/components/alert');
    await percySnapshot('Alert');

    await visit('/components/app-footer');
    await percySnapshot('AppFooter');

    await visit('/components/app-header');
    await percySnapshot('AppHeader');

    await visit('/components/app-side-nav');
    await percySnapshot('AppSideNav');

    await visit('/components/application-state');
    await percySnapshot('ApplicationState');

    await visit('/components/badge');
    await percySnapshot('Badge');

    await visit('components/badge-count');
    await percySnapshot('BadgeCount');

    await visit('/components/breadcrumb');
    await percySnapshot('Breadcrumb');

    await visit('/components/button');
    await percySnapshot('Button');

    await visit('/components/button-set');
    await percySnapshot('ButtonSet');

    await visit('/components/card');
    await percySnapshot('Card');

    await visit('/components/code-block');
    await percySnapshot('CodeBlock');

    await visit('/components/code-editor');
    await waitFor('.hds-code-editor__loader', { count: 0 });
    await percySnapshot('CodeEditor');

    await visit('/components/copy/button');
    await percySnapshot('CopyButton');

    await visit('/components/copy/snippet');
    await percySnapshot('CopySnippet');

    await visit('/components/dropdown');
    await percySnapshot('Dropdown');

    await visit('/components/flyout');
    await percySnapshot('Flyout');

    await visit('/components/form/layout');
    await percySnapshot('Form - Layout');

    await visit('/components/form/base-elements');
    await click('button#dummy-toggle-highlight');
    await percySnapshot('Form - Base elements');

    await visit('/components/form/checkbox');
    await percySnapshot('Form - Checkbox');

    await visit('/components/form/file-input');
    await percySnapshot('Form - FileInput');

    await visit('/components/form/key-value-inputs');
    await percySnapshot('Form - KeyValueInputs');

    await visit('/components/form/masked-input');
    await percySnapshot('Form - MaskedInput');

    await visit('/components/form/radio');
    await percySnapshot('Form - Radio');

    await visit('/components/form/radio-card');
    await percySnapshot('Form - RadioCard');

    await visit('/components/form/select');
    await percySnapshot('Form - Select');

    await visit('/components/form/super-select');
    await percySnapshot('Form - SuperSelect');

    await visit('/components/form/text-input');
    await percySnapshot('Form - TextInput');

    await visit('/components/form/textarea');
    await percySnapshot('Form - Textarea');

    await visit('/components/form/toggle');
    await percySnapshot('Form - Toggle');

    await visit('/components/icon');
    await percySnapshot('Icon');

    await visit('/components/icon-tile');
    await percySnapshot('IconTile');

    await visit('/components/link/inline');
    await percySnapshot('Link Inline');

    await visit('/components/link/standalone');
    await percySnapshot('Link Standalone');

    await visit('/components/modal');
    await percySnapshot('Modal');

    await visit('/components/page-header');
    await click('button#shw-component-toggle-highlight');
    await percySnapshot('PageHeader');

    await visit('/components/pagination');
    await percySnapshot('Pagination');

    await visit('/components/reveal');
    await percySnapshot('Reveal');

    await visit('/components/rich-tooltip');
    await percySnapshot('RichTooltip');

    await visit('/components/segmented-group');
    await percySnapshot('Segmented Group');

    await visit('/components/separator');
    await percySnapshot('Separator');

    await visit('/components/side-nav');
    await percySnapshot('SideNav');

    await visit('/components/stepper/indicator');
    await percySnapshot('Stepper Indicator');

    await visit('/components/stepper/list');
    await percySnapshot('Stepper List');

    await visit('/components/stepper/nav');
    await percySnapshot('Stepper Nav');

    await visit('/components/table');
    await percySnapshot('Table');

    await visit('/components/tabs');
    await percySnapshot('Tabs');

    await visit('/components/tag');
    await percySnapshot('Tag');

    await visit('/components/text');
    await percySnapshot('Text');

    // Note: The dynamic nature of the Time component triggers an infinite rendering invalidation error so we are skipping this component for now.
    // await visit('/components/time');
    // await percySnapshot('Time');

    await visit('/components/toast');
    await percySnapshot('Toast');

    await visit('/components/tooltip');
    await percySnapshot('Tooltip');

    await visit('/layouts/app-frame');
    await percySnapshot('AppFrame');

    await visit('/layouts/flex');
    await percySnapshot('Flex');

    await visit('/layouts/grid');
    await percySnapshot('Grid');

    await visit('/overrides/power-select');
    await percySnapshot('PowerSelect');

    await visit('/utilities/dialog-primitive');
    await percySnapshot('DialogPrimitive');

    await visit('/utilities/dismiss-button');
    await percySnapshot('DismissButton');

    await visit('/utilities/popover-primitive');
    await percySnapshot('PopoverPrimitive');

    // DO NOT REMOVE – PERCY SNAPSHOTS END

    assert.ok(true);
  });
});
