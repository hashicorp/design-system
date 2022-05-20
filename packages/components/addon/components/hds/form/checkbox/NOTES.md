# NOTES - CHECKBOX

## STRUCTURE

- doc page: https://structure.hashicorp.vercel.app/?path=/story/components-checkboxfield--index
  - facade: https://structure.hashicorp.vercel.app/?path=/story/components-checkboxfield-facade--index
  - multi-line label: https://structure.hashicorp.vercel.app/?path=/story/components-checkboxfield--multi-line-label
    - done using simply a `<br />`: https://github.com/hashicorp/structure/blob/dffbb0e0ae5246d3b832586ab25bcb981a052b30/packages/pds-ember/tests/integration/components/checkbox-field/stories/index.stories.js#L39-L43
  - blueprints: https://structure.hashicorp.vercel.app/?path=/story/components-checkbox-blueprints--page
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/checkbox-field/index.js
  - the `id` can be passed as argument (`@id`) otherwise is generated at runtime
  - they have these arguments
    - `@invalid` (according to the comments, applies an "invalid" appearance but does _not_ modify logical validity (i.e., `:valid` or `:invalid`))
  - **no** tracked properties "dirty" and "touched" (I think because it uses `<Pds::Input>` internally)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/checkbox-field/index.hbs
  - it uses `<Pds::Input>` internally with `type="checkbox"`
  - it has a `<label>` sibling element
    - the label contains:
      - a `pds-checkboxField__facadeWrapper`
        - comment: "required so that line-height is inherited for vertical alignment with label text"
        - in reality, is just a CSS grid item
      - the <Pds::CheckboxField::Facade />
      - the `pds-checkboxField__text` text that yields its content
        - 🚨🚨 IMPORTANT 🚨🚨: this also hashes the `id` and pass it to the yielded content, probably we will have to do the same too if they use it in this way for some reasons (not sure why)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/checkbox-field/facade.hbs
  - it uses a "facade" element to have custom styling of the root element
    - internally uses the `<Pds::Icon>` with `icon="check-plain"` (are we going to do the same?)

## CLOUD UI

Found only 4 occurrencies of `<Pds::CheckboxField>` in 2 files
- `name`
- `@checked`
- `@invalid`
- `{{on 'input' ...}}`
- `data-test-*`

GH search results: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3CPds%3A%3ACheckboxField+language%3AHandlebars+repo%3Ahashicorp%2Fcloud-ui

Found no instances of `<checkbox>` across the codebase.

Notice: there is also the `RadioCard` component used quite a few times, but that's another component.

## CONSUL

- apparently it's using a `<FormGroup>` component that yields a `Checkbox` element
  - https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/form-group/element/checkbox/index.hbs
    - `@name`
    - `@value`
    - `{{did-insert ...}}`
    - `{{on 'change' ...}}`
  - see for example how it's used here: https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/consul/intention/permission/form/index.hbs#L93-L99
- there is some specific styling for checkbox groups? https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/checkbox-group/index.scss

## BOUNDARY/ROSE

- doc page: https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-checkbox--basic-checkbox
- https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/checkbox/index.hbs
  - they **do not** use a @contextual argument to allow consumers to use a contentual component syntax for the component invocation
    - uses the `Form/Input` component internally
    - the component exposes the following props
      - `@inline` - used to display the container as `display: inline-block` and pre-defined right margin
      - `@name`
      - `@value`
      - `@label`
      - `@helperText`
      - **no** `@link` + `@linkText` as in input
      - `@error`
      - `@disabled`
      - `@aria-describedby`
      - `@icon` (always leading)
      - `@onChange`
      - readonly (attr)
      - generates a UID internally (in JS backing class) used for "ID", "for", "aria-describedby"
    - has siblings:
      - `<label>` with `@label` value and optional `@description` text
      - `<Rose::Form::HelperText>` conditional to `@helperText`
      - `<Rose::Form::Errors>` yielded as hashed contextual component

- doc page (group): https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-checkbox-group--basic
- https://github.com/hashicorp/boundary-ui/tree/main/addons/rose/addon/components/rose/form/checkbox/group
  - https://raw.githubusercontent.com/hashicorp/boundary-ui/main/addons/rose/addon/components/rose/form/checkbox/group/index.stories.mdx
    - used only for testing, never in real code: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+Checkbox%3A%3AGroup+repo%3Ahashicorp%2Fboundary-ui


## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend

Found 24 occurrencies of `<Input>` in 13 files (not sure where this component comes from, maybe some Ember addon?)
- `id` (10)
- `name` (13)
- `@checked` (23)
- `disabled` (3)
- `aria-label` (2)
- `aria-describedby` (2)
- `aria-disabled` (1)
- `data-test-*` (12)
- `onchange` (6)

Found 9 occurrencies of native `<input type="text">` in 6 files
- `id` (2)
- `name` (7)
- `value` (2)
- `checked` (9)
- `disabled` (2)
- `aria-describedby` (1)
- `data-test-*` (5)
- `onchange` (8)

## WAYPOINT

- found only one instance of `<Pds::CheckboxField>` and one of `<input type="checkbox">`

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/checkbox
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-checkbox/index.hbs
  - they don't use the @controlOnly argument to allow consumers to generate just the simple "select", instead of the what they're doing with the "text field"
  - expose the following arguments
    - `@id`
    - `@disabled`
    - `@label`
    - `@checked`
    - `{{on 'change' ...}}`
    -  `<:label>` block
    - ⚠️⚠️ NOTICE ⚠️⚠️: they expose also a `@indeterminate` argument (we may need to do the same?)

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/checkbox-group
- https://github.com/prysmex/ember-eui/tree/master/packages/core/addon/components/eui-checkbox-group
  - expose the following arguments
    - `@legend`
    - `@options`
    - `@valueKey`
    - `@onChange`

