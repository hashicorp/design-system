/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

/**
 * Docs: https://github.com/ember-cli/ember-cli-deprecation-workflow
 */
setupDeprecationWorkflow({
  /**
    false by default, but if a developer / team wants to be more aggressive about being proactive with
    handling their deprecations, this should be set to "true"
  */
  throwOnUnhandled: false,
  workflow: [
    /* ... handlers ... */
    /* to generate this list, run your app for a while (or run the test suite),
     * and then run in the browser console:
     *
     *    deprecationWorkflow.flushDeprecations()
     *
     * And copy the handlers here
     */
    /* example: */
    /* { handler: 'silence', matchId: 'template-action' }, */
    { handler: 'silence', matchId: 'remove-owner-inject' },
    { handler: 'silence', matchId: 'ember-modifier.function-based-options' },
    { handler: 'silence', matchId: 'importing-inject-from-ember-service' },
    { handler: 'throw', matchId: 'deprecate-auto-location' },
    { handler: 'silence', matchId: 'ember-string.add-package' },
    { handler: 'throw', matchId: 'hds.dropdown.list-item.interactive' },
    { handler: 'throw', matchId: 'hds.components.flyout.body' },
    { handler: 'throw', matchId: 'hds.components.flyout.description' },
    { handler: 'throw', matchId: 'hds.components.flyout.footer' },
    { handler: 'throw', matchId: 'hds.components.flyout.header' },
    { handler: 'throw', matchId: 'hds.components.modal.body' },
    { handler: 'throw', matchId: 'hds.components.modal.footer' },
    { handler: 'throw', matchId: 'hds.components.modal.header' },
  ],
});
