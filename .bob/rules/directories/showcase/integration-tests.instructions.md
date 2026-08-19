---
applyTo: "showcase/tests/integration/**"
description: "Instructions for integration tests written for the HDS components package"
---

## Overview

Integration tests are used to test the functionality of the HDS components. They test that all arguments, events, contextual components, and user interactions are operating as expected.

## File requirements

- Every component must have an integration test file under `integration/components/hds/<component-name>/index-test.gts`
- Any sub-components must have their own integration test files under `integration/components/hds/<component-name>/<sub-component>-test.gts`

## Test set up

Use the following template for organizing the integration test files

```gts
import { module, test } from 'qunit';

import { HdsComponentName } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/component-name/index', function (hooks) {
  setupRenderingTest(hooks);

  <!-- Write test cases here -->
  test('TEST CASES GO HERE', async function (assert) {
  });
})
```

## What to test for

For a given test, the test should have assertions for the following kinds of items given on how the component template changes based on the test conditions.
- Proper class names are applied
- Textual content, or values for HTML attributes are set as expected
- HTML elements are added or removed as expected

Only test for these items if they differ from the default template and functionality for a component.

Example: If setting a `@color="secondary"` argument changes the CSS classes applied and the textual content of the template. Test that the correct class was applied and the text content is what it should be.

## Test cases

For a given component the following tests should be added. Tests should be added in the order they are listed below.

### Component rendering

Test that the component is rendered, and that its CSS class is applied as expected.

### Arguments

All arguments in the `Args` of a component's signature should be tested in the following ways.

- Arguments with multiple values, such as `@type` or `@color`
  - Test for default value with no argument provided
  - Test for setting argument to an additional supported value
- Boolean arguments
  - Test for default value
  - Test for inverse
- Callbacks
  - Callback functions are properly attached and function as expected
  - Use `TrackedObject` to capture function calls
- Assertions
  - Test that any assertions for invalid values or other situations are called

### Contextual components

All contextual components in the component signature and any default yielded blocks should be tested.

- Test that when the block is included the content is rendered as expected

### User interactions

Any interaction a user takes which can alter the component template or functionality should be tested. Examples include:

- Clicking a button which alters the elements rendered
- An interaction which causes other callbacks to be thrown or other js functionality to be ran
- An `aria` argument changing based on a user interaction

## Example tests

Component rendering

```gts
test('it should render the component with a CSS class that matches the component name', async function (assert) {
  await render(<template><HdsComponentName id="test-component-name" /></template>);
  assert.dom('#test-component-name').hasClass('hds-component-name');
});
```

Arguments with multiple values

```gts
test('it should render the default color if no @color is declared', async function (assert) {
  await render(<template><HdsComponentName id="test-component-name" /></template>);
  assert.dom('#test-component-name').hasClass('hds-component-name--default-color');
});

test('it should render the color provided to the @color argument', async function (assert) {
  await render(<template><HdsComponentName id="test-component-name" @color="secondary" /></template>);
  assert.dom('#test-component-name').hasClass('hds-component-name--secondary');
});
```

Boolean arguments

```gts
test('it should not render the icon by default for the @hasIcon argument', async function (assert) {
  await render(<template><HdsComponentName id="test-component-name" /></template>);
  assert.dom('#test-component-name .hds-icon').doesNotExist();
});

test('it should render the icon if the @hasIcon argument is true', async function (assert) {
  await render(<template><HdsComponentName id="test-component-name" @hasIcon={{true}}/></template>);
  assert.dom('#test-component-name .hds-icon').exists();
});
```

Callbacks

```gts
test('it should call @onDismiss callback function', async function (assert) {
  const context = new TrackedObject<{
    isChanged: boolean;
  }>({
    isChanged: false,
  });

  const onDismiss = () => {
    context.isChanged = true;
  };

  await render(
    <template>
      <HdsComponentName id="test-component-name" @onDismiss={{onDismiss}} />
    </template>,
  );

  await click('.hds-component-name__dismiss');
  assert.ok(context.isChanged);
});
```

User interactions

```gts
test('it should perform an action when the button is clicked', async function (assert) {
  await render(
    <template>
      <HdsComponentName id="test-component-name" />
    </template>,
  );

  await click('#test-component-name .component-name__button');

  assert.dom('#test-component-name .new-element-rendered').exists();
});
```