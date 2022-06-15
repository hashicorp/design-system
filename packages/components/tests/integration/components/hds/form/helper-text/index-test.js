import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/helper-text/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Form::HelperText id="test-form-helper-text" />`);
      assert.dom('#test-form-helper-text').exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::Form::HelperText id="test-form-helper-text" />`);
      assert.dom('#test-form-helper-text').hasClass('hds-form-helper-text');
    });
    test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
      await render(
        hbs`<Hds::Form::HelperText @contextualClass="my-class" id="test-form-helper-text" />`
      );
      assert.dom('#test-form-helper-text').hasClass('my-class');
    });

    // CONTENT

    test('it renders a helper text with the defined text', async function (assert) {
      await render(
        hbs`<Hds::Form::HelperText id="test-form-helper-text">This is the helper text</Hds::Form::HelperText>`
      );
      assert.dom('#test-form-helper-text').hasText('This is the helper text');
    });
    test('it renders a helper text with the yielded content', async function (assert) {
      assert.expect(2);
      await render(
        hbs`<Hds::Form::HelperText id="test-form-helper-text"><pre>This is an HTML element inside the helper text</pre></Hds::Form::HelperText>`
      );
      assert.dom('#test-form-helper-text > pre').exists();
      assert
        .dom('#test-form-helper-text pre')
        .hasText('This is an HTML element inside the helper text');
    });

    // ATTRIBUTES

    test('it renders a helper text with the correct "id" attribute if the @controlId argument is provided', async function (assert) {
      await render(
        hbs`<Hds::Form::HelperText @controlId="my-control-id">This is the helper text</Hds::Form::HelperText>`
      );
      assert.dom('#helper-text-my-control-id').exists();
    });
    test('it should spread all the attributes passed to the component', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Form::HelperText id="test-form-helper-text" class="my-class" data-test1 data-test2="test" />`
      );
      assert.dom('#test-form-helper-text').hasClass('my-class');
      assert.dom('#test-form-helper-text').hasAttribute('data-test1');
      assert.dom('#test-form-helper-text').hasAttribute('data-test2', 'test');
    });
  }
);
