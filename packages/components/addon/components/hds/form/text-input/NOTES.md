# NOTES - TEXT INPUT

## STRUCTURE

- doc page: https://structure.hashicorp.vercel.app/?path=/story/components-input--index
- https://github.com/hashicorp/structure/blob/dffbb0e0ae5246d3b832586ab25bcb981a052b30/packages/pds-ember/addon/components/pds/input/utils.js#L3-L25
  - They have multiple types of inputs, mapped to a "text-like" input or not
    - button: { like: 'button' },
    - checkbox: { like: 'checkbox' },
    - color: { like: 'color' },
    - date: { like: 'text' },
    - datetime: { like: 'text', obsolete: true },
    - 'datetime-local': { like: 'text' },
    - email: { like: 'text' },
    - file: { like: 'file' },
    - month: { like: 'text' },
    - number: { like: 'text' },
    - password: { like: 'text' },
    - radio: { like: 'radio' },
    - range: { like: 'range' },
    - reset: { like: 'button' },
    - search: { like: 'text' },
    - submit: { like: 'button' },
    - tel: { like: 'text' },
    - text: { like: 'text' },
    - time: { like: 'text' },
    - url: { like: 'text' },
    - week: { like: 'text' },
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/input/index.js
  - they have these extra arguments
    - @invalid (according to the comments, applies an "invalid" appearance but does _not_ modify logical validity (i.e., `:valid` or `:invalid`))
  - they have two tracked properties "dirty" and "touched", that get set to true on "onBlur"
    - these are mapped to HTML attributes "pds-dirty" and "pds-touched" (see below)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/input/index.hbs
  - they have these extra props
    - pds-dirty=\{\{this.dirty\}\}
    - pds-touched=\{\{this.touched\}\}
    - \{\{on 'blur' this.onBlur once=true passive=true\}\}
- For more details about validation in PDS/Structure see:

  - https://structure.hashicorp.vercel.app/?path=/story/guides-forms-validation--page
  - notice these dirty/touched validation are applied only to `text input` + `select` + `textarea`

- Notice: for the documentation website (storybook) they've created a custom `Docs:FormField` component that puts together different pieces of code:
  - https://github.com/hashicorp/structure/blob/main/packages/pds-ember/tests/dummy/app/components/docs/form-field/index.hbs
  - https://github.com/hashicorp/structure/blob/dffbb0e0ae5246d3b832586ab25bcb981a052b30/packages/pds-ember/tests/integration/components/form-field/stories/index.stories.js#L31-L45
  - https://structure.hashicorp.vercel.app/?path=/story/components-form-field--index

## CLOUD UI

Run a codemod to collect some stats, here's the results:

Found 61 occurrencies of `<Pds::Input>` in 28 files

- `@type` (55)
  - [missing/default] (6)
  - text (37)
  - date (4)
  - password (4)
  - radio (3)
  - time (3)
  - url (2)
  - checkbox (1)
  - email (1)
- `id` (52)
- `name` (44)
- `value` (58)
- `placeholder` (12)
- `@invalid` (44)
- `autocomplet`e (4)
- `checke`d (4)
- `min` (3)
- `max` (2)
- `required` (10)
- `disabled` (9)
- `aria-describedby` (31)
- `aria-labeledBy` (1)
- `data-test-\*` (54)

Found only 2 instances of `<input>` in 1 file

GH search results too: https://cs.github.com/?q=org%3Ahashicorp%20%3CPds%3A%3AInput%20language%3AHandlebars%20repo%3Ahashicorp%2Fcloud-ui&scopeName=All%20repos&scope=

## CONSUL

- doc page: https://github.com/hashicorp/consul/tree/main/ui/packages/consul-ui/app/components/text-input
- https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/form-input/index.hbs
- this contains the label, the "input" yielding, the helper text and the error text all in the same component
- they are named blocks, so technically the "form-input" is a layout element, more of a generic container, than an "input" component
- https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/text-input/index.hbs
  - this is the actual "text-input" component
    - the "input" exposes
      - an "onInput" callback
      - there is a "validate" modifier (see https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/modifiers/validate.mdx)
    - it has @label, @name, @placeholder, @help

## BOUNDARY/ROSE

- doc page: https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-input--basic-field
- they have an interesting organization/architecture of code:
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/input/index.hbs
    - they use a @contextual argument to allow consumers to use a contentual component syntax for the input (see https://github.com/hashicorp/boundary-ui/blame/main/addons/rose/addon/components/rose/form/input/index.stories.mdx#L141-L153)
    - the component exposes the following props
      - `@type` - can be `text/email/number/password`
      - `@name`
      - `@value`
      - `@label`
      - `@helperText`
      - `@link` + `@linkText`
      - `@error`
      - `@disabled`
      - `@aria-describedby`
      - `@icon` (always leading)
      - readonly (attr)
      - generates a UID internally (in JS backing class) used for "ID", "for", "aria-describedby"
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/input/input/index.hbs
    - this is the "pure" input, and is located in a sub-folder (with same name as component, same for select or textarea)

## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend
  - they're using native HTML <input>/<label> elements, no components
  - the styling is done via specific classes (see https://github.com/hashicorp/atlas/blob/main/frontend/atlas/app/styles/core/_form.scss)

## WAYPOINT

- https://github.com/hashicorp/waypoint/tree/main/ui
  - they're using native HTML <input>/<label> elements (no custom components)
  - 4 instances of `Pds::Input` (only with `@type=text`)
    - https://cs.github.com/?q=org%3Ahashicorp%20%3CPds%3A%3AInput%20language%3AHandlebars%20repo%3Ahashicorp%2Fwaypoint
  - they have only 5/6 cases, and they're styled in the context of where they're used (not globally)

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/text-field
- doc page: https://elastic.github.io/eui/#/forms/form-controls#text-field
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-field-text/index.hbs
  - they use a @controlOnly argument to allow consumers to generate just the simple "input", instead of the whole "field" (using the FormControlLayout, see below)
  - the text field exposes these extra properties:
    - fullWidth
    - loading (the leading/trailing icon is a loading icon)
    - prepend/append (named blocks?)
  - internally it uses the FormControlLayout
    - https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-form-control-layout/index.hbs
      - it's the responsible for the prepend/append
