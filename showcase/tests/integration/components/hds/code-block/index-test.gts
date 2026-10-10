/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  click,
  find,
  findAll,
  render,
  resetOnerror,
  settled,
  setupOnerror,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/code-block/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').hasClass('hds-code-block');
  });

  // CONTENT

  test('it renders the passed in code text content', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert
      .dom('#test-code-block pre code')
      .containsText("console.log('Hello world');");
  });

  // DYNAMIC CONTENT

  test('it renders the passed in dynamic content', async function (assert) {
    const context = new TrackedObject({
      value: "console.log('Hello world');",
    });

    await render(
      <template>
        <HdsCodeBlock @value={{context.value}} id="test-code-block" />
      </template>,
    );
    assert
      .dom('#test-code-block pre code')
      .hasText("console.log('Hello world');");

    context.value = "console.log('Lorem ipsum');";
    await settled();

    assert
      .dom('#test-code-block pre code')
      .hasText("console.log('Lorem ipsum');");
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
          as |CB|
        >
          <CB.Title>Title</CB.Title>
          <CB.Description>Description</CB.Description>
        </HdsCodeBlock>
      </template>,
    );
    const title = find('.hds-code-block__title');
    const titleId = title?.id ?? '';

    assert.dom('.hds-code-block__code').hasAria('labelledby', titleId);
    assert.dom('.hds-code-block__title').hasText('Title');

    const description = find('.hds-code-block__description');
    const descriptionId = description?.id ?? '';

    assert.dom('.hds-code-block__code').hasAria('describedby', descriptionId);
    assert.dom('.hds-code-block__description').hasText('Description');
  });

  test('it renders the title as a p when the @tag argument is not provided', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
          as |CB|
        >
          <CB.Title>Title</CB.Title>
        </HdsCodeBlock>
      </template>,
    );
    assert.dom('.hds-code-block__title').hasTagName('p');
  });

  test('it renders the title as the custom title tag when the @tag argument is provided', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
          as |CB|
        >
          <CB.Title @tag="h2">Title</CB.Title>
        </HdsCodeBlock>
      </template>,
    );
    assert.dom('.hds-code-block__title').hasTagName('h2');
  });

  // OPTIONS

  // ariaLabel
  test('it sets the aria-label property to the value provided', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @ariaLabel="test"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('.hds-code-block__code').hasAria('label', 'test');
  });

  // ariaLabelledBy
  test('it sets the aria-labelledby property to the value provided', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @ariaLabelledBy="test-id"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('.hds-code-block__code').hasAria('labelledby', 'test-id');
  });
  test('it does not set the aria-labelledby property to the value provided if an ariaLabel argument is set', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @ariaLabel="test"
          @ariaLabelledBy="test-id"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('.hds-code-block__code').doesNotHaveAria('labelledby');
  });

  // ariaDescribedBy
  test('it sets the aria-describedby property to the value provided', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @ariaDescribedBy="test-id"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('.hds-code-block__code').hasAria('describedby', 'test-id');
  });

  // isStandalone
  test('it has rounded corners by default', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').hasClass('hds-code-block--is-standalone');
  });

  test('it does not have rounded corners if `isStandalone` is set to false', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @isStandalone={{false}}
          id="test-code-block"
        />
      </template>,
    );
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--is-standalone');
  });

  // language
  test('it has no default language for syntax highlighting', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').doesNotHaveClass(/language-*/);
  });

  test('it uses the passed in language value for syntax highlighting', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @language="go"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').hasClass('language-go');
  });

  test('syntax highlighting fails gracefully if an invalid language is specified', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          {{! @glint-expect-error - assertion testing invalid value }}
          @language="foo"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').hasClass('language-foo');
    assert.dom('#test-code-block .token').doesNotExist();
  });

  // hasCopyButton
  test('it does not display a Copy button by default', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" />
      </template>,
    );
    assert.dom('.hds-code-block__copy-button').doesNotExist();
  });

  test(`it displays a Copy button if hasCopyButton is set to true`, async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @hasCopyButton={{true}}
        />
      </template>,
    );

    assert
      .dom('.hds-code-block__copy-button')
      .exists()
      .hasAria('label', 'Copy');
  });

  test('it renders a Copy button with custom text', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @hasCopyButton={{true}}
          @copyButtonText="Foo"
        />
      </template>,
    );

    assert.dom('.hds-code-block__copy-button').exists().hasAria('label', 'Foo');
  });

  test('it calls the onCopy action when the Copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();

    const copySpy = sinon.spy();

    await render(
      <template>
        <HdsCodeBlock
          @value="test"
          @hasCopyButton={{true}}
          @onCopy={{copySpy}}
        />
      </template>,
    );

    await click('.hds-code-block__copy-button');
    assert.ok(copySpy.calledOnce, 'onCopy action was called');

    sinon.restore();
  });

  // copySuccessMessageText
  test('it should set the default success message in the aria-live region when the copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
    const copySpy = sinon.spy();

    await render(
      <template>
        <HdsCodeBlock
          @value="test"
          @hasCopyButton={{true}}
          @onCopy={{copySpy}}
        />
      </template>,
    );

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .doesNotContainText('Copied to clipboard');

    await click('.hds-code-block__copy-button');

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .hasText('Copied to clipboard');

    sinon.restore();
  });

  test('it should set a custom success message in the aria-live region when the copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
    const copySpy = sinon.spy();

    await render(
      <template>
        <HdsCodeBlock
          @value="test"
          @hasCopyButton={{true}}
          @copySuccessMessageText="Custom success message"
          @onCopy={{copySpy}}
        />
      </template>,
    );

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .doesNotContainText('Custom success message');

    await click('.hds-code-block__copy-button');

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .hasText('Custom success message');

    sinon.restore();
  });

  // hasLineNumbers
  test('it displays line numbers by default', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').hasClass('line-numbers');
  });

  test('it does not display line numbers if hasLineNumbers is set to false', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @hasLineNumbers={{false}}
          id="test-code-block"
        />
      </template>,
    );
    assert.dom('#test-code-block').doesNotHaveClass('line-numbers');
  });

  // hasLineWrapping
  test('it does not wrap code line by default', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          id="test-code-block"
        />
      </template>,
    );
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--has-line-wrapping');
  });

  test('it wraps code lines if hasLineWrapping is set to true', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          @value="console.log('Hello world');"
          @hasLineWrapping={{true}}
          id="test-code-block"
        />
      </template>,
    );
    assert
      .dom('#test-code-block')
      .hasClass('hds-code-block--has-line-wrapping');
  });

  // highlightLines
  test('it highlights the passed in individual line numbers', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          id="test-code-block-highlight"
          @highlightLines="1"
          @value="console.log('Hello world');"
        />
      </template>,
    );
    assert
      .dom('#test-code-block-highlight [data-range="1"]')
      .exists()
      .hasClass('line-highlight');

    const highlightLabels = findAll(
      '#test-code-block-highlight .hds-code-block__code .sr-only',
    );
    assert.dom(highlightLabels[0]).hasText('highlight start');
    assert.dom(highlightLabels[1]).hasText('highlight end');
  });

  test('it places the `sr-only` markers on the correct start and end lines', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          id="test-code-block-highlight"
          @language="go"
          @highlightLines="2-4"
          @value="package main
  import 'fmt'
  func main() {
    fmt.Println('hello world')
  }"
        />
      </template>,
    );

    const startLabelRange = document.createRange();
    const endLabelRange = document.createRange();

    const highlightLabels = findAll(
      '#test-code-block-highlight .hds-code-block__code .sr-only',
    );
    const highlightStart = highlightLabels[0];
    const highlightEnd = highlightLabels[1];

    const codeElement = find('.hds-code-block__code code');

    if (codeElement && highlightStart && highlightEnd) {
      startLabelRange.setStartBefore(codeElement);
      startLabelRange.setEndAfter(highlightStart);

      endLabelRange.setStartBefore(codeElement);
      endLabelRange.setEndAfter(highlightEnd);
    }

    const linesBeforeStart = startLabelRange.toString().match(/\r?\n/g);
    const linesBeforeEnd = endLabelRange.toString().match(/\r?\n/g);

    const numLinesBeforeStart = linesBeforeStart?.length ?? 0;
    const numLinesBeforeEnd = linesBeforeEnd?.length ?? 0;

    // Note: We add 1 because highlight lines are 1-based
    assert.strictEqual(numLinesBeforeStart + 1, 2);
    assert.strictEqual(numLinesBeforeEnd + 1, 4);
  });

  test('it places the `sr-only` markers correctly when `@lineNumberStart` is defined', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock
          id="test-code-block-highlight"
          @language="ruby"
          @highlightLines="14-17"
          @lineNumberStart={{2}}
          @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
        />
      </template>,
    );

    const startLabelRange = document.createRange();
    const endLabelRange = document.createRange();

    const highlightLabels = findAll(
      '#test-code-block-highlight .hds-code-block__code .sr-only',
    );
    const highlightStart = highlightLabels[0];
    const highlightEnd = highlightLabels[1];

    const codeElement = find('.hds-code-block__code code');

    if (codeElement && highlightStart && highlightEnd) {
      startLabelRange.setStartBefore(codeElement);
      startLabelRange.setEndAfter(highlightStart);

      endLabelRange.setStartBefore(codeElement);
      endLabelRange.setEndAfter(highlightEnd);
    }

    const linesBeforeStart = startLabelRange.toString().match(/\r?\n/g);
    const linesBeforeEnd = endLabelRange.toString().match(/\r?\n/g);

    const numLinesBeforeStart = linesBeforeStart?.length ?? 0;
    const numLinesBeforeEnd = linesBeforeEnd?.length ?? 0;

    // Note: Expected newline counts have been subtracted by (lineNumberStart - 1)
    assert.strictEqual(numLinesBeforeStart + 1, 13);
    assert.strictEqual(numLinesBeforeEnd + 1, 16);
  });

  // maxHeight
  test('it uses the passed in maxHeight value', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" @maxHeight="100px" />
      </template>,
    );
    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: 100px;');
  });

  test('it displays a "Show more" button if the height of the code content is greater than the maxHeight', async function (assert) {
    // Note: We set a very small maxHeight to ensure the code block is scrollable
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
      </template>,
    );
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show more code');
  });

  test('it does not display a height toggle button if the height of the code content is less than the maxHeight', async function (assert) {
    // Note: We use ems since if they were incorrectly interpreted as pixels, the test would fail)
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" @maxHeight="5em" />
      </template>,
    );
    assert.dom('.hds-code-block__height-toggle-button').doesNotExist();
  });

  test('it expands to show all content and displays a "Show less" button when "Show more" is clicked', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
      </template>,
    );

    assert
      .dom('.hds-code-block')
      .hasClass('hds-code-block--has-overlay-footer');

    await click('.hds-code-block__height-toggle-button');

    assert.dom('.hds-code-block').hasClass('hds-code-block--is-expanded');
    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: none;');
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show less code');
  });

  test('it collapses to show less content and displays a "Show more" button when "Show less" is clicked', async function (assert) {
    await render(
      <template>
        <HdsCodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
      </template>,
    );

    await click('.hds-code-block__height-toggle-button');

    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show less code');

    await click('.hds-code-block__height-toggle-button');

    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: 1em;');
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show more code');
  });

  // ASSERTION

  test('it should throw an assertion if no value for @code is provided', async function (assert) {
    const errorMessage = '@code for "Hds::CodeBlock" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsCodeBlock />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
