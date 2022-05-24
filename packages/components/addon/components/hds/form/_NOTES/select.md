# NOTES - SELECT

## STRUCTURE

- doc page: https://structure.hashicorp.vercel.app/?path=/story/components-select--index (see also the other pages)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/select/index.js
  - they have these arguments
    - `@options` list of options as array of objects
      - uses a `normalizeOptions` method that
        - cleans up the argument (not sure why this is needed, and why this is not just responsibility of the consumer to do)
        - defines the "selected" option using the `@value` argument
    - `@value` used to determine the "selected" value
    - `@invalid` (according to the comments, applies an "invalid" appearance but does _not_ modify logical validity (i.e., `:valid` or `:invalid`))
  - they have two tracked properties "dirty" and "touched", that get set to true on "onBlur"
    - these are mapped to HTML attributes "pds-dirty" and "pds-touched" (see below)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/select/index.hbs
  - they have these extra props
    - pds-dirty=\{\{this.dirty\}\}
    - pds-touched=\{\{this.touched\}\}
    - \{\{on 'blur' this.onBlur once=true passive=true\}\} - not sure why it's not onChange, maybe is better this way?
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/select/facade.hbs
  - it uses a "facade" element to have custom styling of the root element
  - apparently what it does is just to add a custom icon to it (in overlay), not changing the style of the root element as usually I've seen doing
- For more details about validation in PDS/Structure see:
  - https://structure.hashicorp.vercel.app/?path=/story/guides-forms-validation--page
  - notice these dirty/touched validation are applied only to `text input` + `select` + `textarea`

## CLOUD UI

Found 13 occurrencies of `<Pds::Select>` in 9 files
- `id`
- `name`
- `disabled`
- `@invalid`
- `aria-describedby`
- `{{on 'change' ...}}`
- `data-test-*`
- `{{data-privacy}}`

GH search results: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3CPds%3A%3ASelect+language%3AHandlebars+repo%3Ahashicorp%2Fcloud-ui

Found 4 instances of `<select>` in 4 files.

Found 5 instances of the Cloud UI specific `<Select>` component (built using a native `<select>`):
  - https://github.com/hashicorp/cloud-ui/blob/master/packages/cloud-ui-core/addon/components/select/index.hbs
  - probably pre-dates the `<Pds::Select>`, and was never migrated (https://hashicorp.slack.com/archives/CPB8GS9QT/p1652902513168849?thread_ts=1652902250.949389&cid=CPB8GS9QT)

GH search results: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3CSelect+language%3AHandlebars+repo%3Ahashicorp%2Fcloud-ui

## CONSUL

- on Consul it's called `<OptionInput>
- doc page: https://github.com/hashicorp/consul/tree/main/ui/packages/consul-ui/app/components/option-input
  - it says it's using [`ember-power-select`](https://ember-power-select.com/) internally
- https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/option-input/index.hbs
  - this is the actual "select" component
    - it exposes
      - @item (probably a bug, is not used in the child component)
      - @items (used to loop over options passed to `<PowerSelect>`)
      - @selected
      - an "onchange" callback
      - a `<:label>` named block (alternative to `@label` I imagine)
      - there is a "validate" modifier (see https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/modifiers/validate.mdx)
    - it has @label, @name, @placeholder, @help
    - it says it will support a @multiple argument (to allow multiple selections, not supported yet)
    - it say it exposes a @expanded	argument ("whether to use expanded radiobuttons/checkboxes or just a non-expanded select-like input") but in the code there are only TODOs
- it uses the generic `<FormInput>` component under the hood
  - https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/form-input/index.hbs
  - see https://consul-ui-staging-cjythooc7-hashicorp.vercel.app/ui/docs/components/form-input
  - this contains the label, the "input" yielding, the helper text and the error text all in the same component
  - they are named blocks, so technically the "form-input" is a layout element, more of a generic container, than an "input" component

## BOUNDARY/ROSE

- doc page: https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-select--basic
- they have an interesting organization/architecture of code:
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/select/index.hbs
    - they use a @contextual argument to allow consumers to use a contentual component syntax for the component invocation
    - the component exposes the following props
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
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/select/select/index.hbs
    - this is the "pure" input, and is located in a sub-folder (with same name as component, same for select or textarea)

## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend
  - found a couple of native HTML <select> elements
    - `id`
    - `onchange`
    - `disabled`
    - `data-test-*`
  - a native `<select>` is used also to build a `<SelectMenu>` component
    -  https://github.com/hashicorp/atlas/blob/main/frontend/atlas/app/components/v2/select-menu.hbs (old, not Glimmer)
    -  https://github.com/hashicorp/atlas/blob/main/frontend/atlas/app/components/select-menu.hbs (Glimmer-ready)

## WAYPOINT

- didn't found any instance of `<select>` or `<Pds::Select>`

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/select
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-select/index.hbs
  - they don't use the @controlOnly argument to allow consumers to generate just the simple "select", instead of the what they're doing with the "text field"
