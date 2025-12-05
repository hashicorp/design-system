/**
 * Copyright IBM Corp. 2021, 2025
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
    { handler: 'throw', matchId: 'ember-modifier.use-destroyables' },
    { handler: 'throw', matchId: 'ember-modifier.use-modify' },
    { handler: 'throw', matchId: 'ember-modifier.no-args-property' },
    { handler: 'throw', matchId: 'ember-modifier.no-element-property' },
    { handler: 'silence', matchId: 'importing-inject-from-ember-service' },
    { handler: 'silence', matchId: 'deprecate-import-destroy-from-ember' },
    {
      handler: 'silence',
      matchId: 'deprecate-import--is-destroying-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--is-destroyed-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--register-destructor-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-test-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-libraries-from-ember',
    },
  ],
});
