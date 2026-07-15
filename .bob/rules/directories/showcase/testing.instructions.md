---
applyTo: "showcase/tests/**"
description: "Instructions for how HDS components should be tested"
---

## Overview
All components from the `packages/components` library must have corresponding acceptance, integration, and Percy visual regression tests in the `showcase` app to ensure all arguments, blocks, and interactive states are covered.

## File structure

Define a folder for a component under `showcase/tests`.

### Required files
- `acceptance/components/hds/<component-name>.js` - Acceptance test for the component.
- `integration/components/hds/<component-name>/index-test.js` - Integration test for the component.

## Acceptance testing

Acceptance tests ensure that a component passes automated a11y checks. They should be defined in `tests/acceptance/components/hds/<component-name>.js`.

```js
import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/component-name', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/hds/component-name page passes a11y automated checks', async function (assert) {
    await visit('/components/component-name');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
```

**IMPORTANT** `a11yAudit` must be included in every component's acceptance test to ensure accessibility is automatically checked for all components.

## Integration testing

Tests use the QUnit library and format. A component's integration tests should be defined in `tests/integration/components/hds/<component-name>/index-test.js`.

### Formatting rules
- Test that the component renders with a CSS class that matches the component name
- Test each argument for all possible values
  - Find a component's arguments in `packages/components/src/components/hds/<component-name>/index.gts`
  - Boolean arguments should be tested with both `true` and `false`
  - Enum arguments should be tested with all possible values
- Test each block in the `Blocks` interface
- Test each function or keyboard interaction

## Percy visual regression testing

The `tests/acceptance/percy-test.js` file registers which components are snapshotted with Percy.

### Requirements
- For all components with acceptance tests in `tests/acceptance/components/hds/`, add them to the list of Percy snapshots in `tests/acceptance/percy-test.js`.
- Use the `percySnapshot` function to take a snapshot. Example: `percySnapshot('ComponentName');`

## Test suite commands

The test suite can be run in its entirety or for specific test files. Use the following commands while in the `showcase` app directory:

- `pnpm test` - Runs the entire test suite
- `ember t -f component-name` - Runs all tests for a specific component, including acceptance and integration tests