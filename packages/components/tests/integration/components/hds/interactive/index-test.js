import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/interactive/index', function (hooks) {
  setupRenderingTest(hooks);

  // notice: since this element can generate different HTML element, to make the tests even more solid, in the DOM selectors we prefix the #ID of the element with the tag name

  test('it renders the interactive container', async function (assert) {
    await render(hbs`<Hds::Interactive />`);
    assert.dom(this.element).exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(hbs`<Hds::Interactive id="test-interactive" />`);
    assert.dom('#test-interactive').hasTagName('button');
  });
  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(hbs`<Hds::Interactive @href="#" id="test-interactive" />`);
    assert.dom('#test-interactive').hasTagName('a');
    assert.dom('#test-interactive').hasAttribute('href', '#');
  });
  test('it should render a <a> link if @route is passed', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Interactive @route="utilities.interactive" id="test-interactive" />`
    );
    assert.dom('#test-interactive').hasTagName('a');
    assert
      .dom('#test-interactive')
      .hasAttribute('href', '/utilities/interactive');
  });

  // SPLATTRIBUTES

  test('it should spread all the attributes passed to the <button> element', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Interactive id="test-interactive" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('button#test-interactive').hasClass('my-class');
    assert.dom('button#test-interactive').hasAttribute('data-test1');
    assert.dom('button#test-interactive').hasAttribute('data-test2', 'test');
  });
  test('it should spread all the attributes passed to the <a> element', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Interactive @href="#" id="test-interactive" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('a#test-interactive').hasClass('my-class');
    assert.dom('a#test-interactive').hasAttribute('data-test1');
    assert.dom('a#test-interactive').hasAttribute('data-test2', 'test');
  });
  test('it should spread all the attributes passed to the <LinkTo> element', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Interactive @route="index" id="test-interactive" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('a#test-interactive').hasClass('my-class');
    assert.dom('a#test-interactive').hasAttribute('data-test1');
    assert.dom('a#test-interactive').hasAttribute('data-test2', 'test');
  });

  // YIELDING

  test('it should yield the children of the <button> element', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Interactive id="test-interactive"><pre>test</pre></Hds::Interactive>`
    );
    assert.dom('button#test-interactive > pre').exists();
    assert.dom('button#test-interactive > pre').hasText('test');
  });
  test('it should yield the children of the <a> element', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Interactive @href="#" id="test-interactive"><pre>test</pre></Hds::Interactive>`
    );
    assert.dom('a#test-interactive > pre').exists();
    assert.dom('a#test-interactive > pre').hasText('test');
  });
  test('it should yield the children of the <LinkTo> element', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Interactive @route="index" id="test-interactive"><pre>test</pre></Hds::Interactive>`
    );
    assert.dom('a#test-interactive > pre').exists();
    assert.dom('a#test-interactive > pre').hasText('test');
  });

  // A11Y

  test('it should render with the correct button "type" by default', async function (assert) {
    await render(hbs`<Hds::Interactive id="test-interactive" />`);
    assert.dom('button#test-interactive').hasAttribute('type', 'button');
  });
  // for some strange bug in "ember-lts-3.24" the type attribute is not overwritten by the "splattributes" (so this test fails in that scenario)
  skip('it should have a custom type if @type is set', async function (assert) {
    await render(hbs`<Hds::Interactive id="test-interactive" type="submit" />`);
    assert.dom('button#test-interactive').hasAttribute('type', 'submit');
  });
});
