---
applyTo: "showcase/tests/**"
description: "Instructions for tests written for the HDS components package"
---

## Overview

The `showcase/tests` directory contains the acceptance and Percy visual regression tests for the HDS components package. The integration and unit tests live in `packages/components/tests` (see `.bob/rules/directories/components/tests.instructions.md`).

## Infrastructure

- Testing framework: `qunit`
- Test helpers: `@ember/test-helpers`
- Accessibility testing: `ember-a11y-testing`

## File structure

- `acceptance/components/hds/<component-name>.js` - Acceptance test for the component.
- `acceptance/percy-test.js` - Percy visual regression testing for all `showcase/app` pages.

## Testing commands

The following commands are used to run the test suite. All commands should be run inside the `showcase` directory.

- `pnpm test` - Runs the entire test suite
- `ember t -f component-name` - Runs the acceptance tests for a specific component

Run the integration tests with `pnpm test` inside `packages/components`.

## Requirements

- All components from the `packages/components` library must have corresponding acceptance and Percy visual regression tests in the `showcase` app, and integration tests in `packages/components/tests`, to ensure all arguments, blocks, and interactive states are covered.
  - Required files
    - `showcase/tests/acceptance/components/hds/<component-name>.js`
    - `packages/components/tests/integration/components/hds/<component-name>/index-test.gts`

## Test types

### Integration and unit tests

Read `.bob/rules/directories/components/tests.instructions.md` for information on integration and unit tests.

### Acceptance tests

Acceptance tests ensure that a component passes automated a11y checks. They should be defined in `acceptance/components/hds/<component-name>.js`.

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

#### Requirements

- A component's showcase route must be viewed with `visit('/components/component-name')`
- `a11yAudit` must be included in every component's acceptance test to ensure accessibility is automatically checked for all components.

### Percy visual regression tests

The `tests/acceptance/percy-test.js` file registers which components are snapshotted with Percy.

#### Requirements

- For all components with acceptance tests in `tests/acceptance/components/hds/`, add them to the list of Percy snapshots in `tests/acceptance/percy-test.js`.
  - List all snapshots in alphabetical order within their given categories
- Use the `percySnapshot` function to take a snapshot. Example: `percySnapshot('ComponentName');`