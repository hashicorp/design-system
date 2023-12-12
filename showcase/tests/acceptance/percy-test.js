/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';
import config from 'showcase/config/environment';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  if (config.emberTryScenario) {
    // eslint-disable-next-line no-console
    console.log('Not running percy in ember-try');
    return;
  }

  test('Take percy snapshots', async function (assert) {
    await visit('/foundations/typography');
    await percySnapshot('Typography');

    await visit('/foundations/icon');
    await percySnapshot('Icon');

    await visit('/foundations/elevation');
    await percySnapshot('Elevation');

    await visit('/foundations/focus-ring');
    await percySnapshot('FocusRing');

    await visit('/components/accordion');
    await percySnapshot('Accordion');

    await visit('/components/alert');
    await percySnapshot('Alert');

    await visit('/components/app-footer');
    await percySnapshot('AppFooter');

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

    await visit('/components/copy/button');
    await percySnapshot('CopyButton');

    await visit('/components/copy/snippet');
    await percySnapshot('CopySnippet');

    await visit('/components/dropdown');
    await percySnapshot('Dropdown');

    await visit('/components/flyout');
    await percySnapshot('Flyout');

    await visit('/components/form/base-elements');
    await click('button#dummy-toggle-highlight');
    await percySnapshot('Form - Base elements');

    await visit('/components/form/checkbox');
    await percySnapshot('Form - Checkbox');

    await visit('/components/form/file-input');
    await percySnapshot('Form - FileInput');

    await visit('/components/form/masked-input');
    await percySnapshot('Form - MaskedInput');

    await visit('/components/form/radio');
    await percySnapshot('Form - Radio');

    await visit('/components/form/radio-card');
    await percySnapshot('Form - RadioCard');

    await visit('/components/form/select');
    await percySnapshot('Form - Select');

    await visit('/components/form/text-input');
    await percySnapshot('Form - TextInput');

    await visit('/components/form/textarea');
    await percySnapshot('Form - Textarea');

    await visit('/components/form/toggle');
    await percySnapshot('Form - Toggle');

    await visit('/components/icon-tile');
    await percySnapshot('IconTile');

    await visit('/components/link/inline');
    await percySnapshot('Link Inline');

    await visit('/components/link/standalone');
    await percySnapshot('Link Standalone');

    await visit('/components/modal');
    await percySnapshot('Modal');

    await visit('/components/page-header');
    await percySnapshot('PageHeader');

    await visit('/components/pagination');
    await percySnapshot('Pagination');

    await visit('/components/reveal');
    await percySnapshot('Reveal');

    await visit('/components/segmented-group');
    await percySnapshot('Segmented Group');

    await visit('/components/separator');
    await percySnapshot('Separator');

    await visit('/components/side-nav');
    await percySnapshot('SideNav');

    await visit('/components/stepper');
    await percySnapshot('Stepper');

    await visit('/components/table');
    await percySnapshot('Table');

    await visit('/components/tabs');
    await percySnapshot('Tabs');

    await visit('/components/tag');
    await percySnapshot('Tag');

    await visit('/components/text');
    await percySnapshot('Text');

    await visit('/components/toast');
    await percySnapshot('Toast');

    await visit('/components/tooltip');
    await percySnapshot('Tooltip');

    await visit('/layouts/app-frame');
    await percySnapshot('AppFrame');

    await visit('/overrides/power-select');
    await percySnapshot('PowerSelect');

    await visit('/utilities/dismiss-button');
    await percySnapshot('DismissButton');

    // DO NOT REMOVE – PERCY SNAPSHOTS END

    assert.ok(true);
  });
});
