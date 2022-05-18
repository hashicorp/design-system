# NOTES - TEXTAREA

## STRUCTURE

- doc page: https://structure.hashicorp.vercel.app/?path=/story/components-textarea--index
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/textarea/index.js
  - they have this extra argument
    - @invalid (according to the comments, applies an "invalid" appearance but does _not_ modify logical validity (i.e., `:valid` or `:invalid`))
  - they have two tracked properties "dirty" and "touched", that get set to true on "onBlur"
    - these are mapped to HTML attributes "pds-dirty" and "pds-touched" (see below)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/textarea/index.hbs
  - they have these extra props (same as input)
    - pds-dirty=\{\{this.dirty\}\}
    - pds-touched=\{\{this.touched\}\}
    - \{\{on 'blur' this.onBlur once=true passive=true\}\}
  - plus this one
    - rows
  - NOTICE: they use the "squiggles" (~) to trim whitespace in the yielded content!
- For more details about validation in PDS/Structure see:
  - https://structure.hashicorp.vercel.app/?path=/story/guides-forms-validation--page
  - notice these dirty/touched validation are applied only to `text input` + `select` + `textarea`

## CLOUD UI

Run a codemod to collect some stats, here's the results:

Found 2 occurrencies of `<Pds::Textare>` in 2 files

- `id` (1)
- `value` (2)
- `@invalid` (1)
- `data-test-\*` (2)

Found no instances of `<textarea>`

GH search results too: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3CPds%3A%3ATextarea+language%3AHandlebars+repo%3Ahashicorp%2Fcloud-ui

## CONSUL

- found only 5 instances using native <textarea> control
- list of arguments passed to it:
  - `name`
  - `value`
  - `disabled`
  - `autofocus`
  - `{{on 'input' ...}}` or `oninput`
  - `{{validate ...}}`

GH search results: https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3Ctextarea+language%3AHandlebars+repo%3Ahashicorp%2Fconsul

## BOUNDARY/ROSE

- doc page: https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-textarea--basic-textarea
- they have an interesting organization/architecture of code:
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/textarea/index.hbs
    - they use a @contextual argument to allow consumers to use a contentual component syntax for the input
    - the component exposes the following props
      - `@name`
      - `@value`
      - `@label`
      - `@helperText`
      - `@link` + `@linkText`
      - `@error`
      - `@disabled`
      - `@aria-describedby`
      - `@icon` (always leading)
      - generates a UID internally (in JS backing class) used for "ID", "for", "aria-describedby"
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/textarea/textarea/index.hbs
    - this is the "pure" textarea, and is located in a sub-folder (with same name as component, same for input or select)

## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend
  - they're using the native HTML <textarea> element, no components
  - the styling is done via specific classes (see https://github.com/hashicorp/atlas/blob/main/frontend/atlas/app/styles/core/_form.scss)

## WAYPOINT

- https://github.com/hashicorp/waypoint/tree/main/ui
  - they're not using native HTML <textarea> elements (no custom components) plus
  - 2 instances of `Pds::Textarea`
    - https://cs.github.com/?scopeName=All+repos&scope=&q=org%3Ahashicorp+%3CPds%3A%3ATextarea+language%3AHandlebars+repo%3Ahashicorp%2Fwaypoint

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/textarea
- doc page: https://elastic.github.io/eui/#/forms/form-controls#textarea
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-text-area/index.hbs
  - they don't use the @controlOnly argument to allow consumers to generate just the simple "textarea", instead of the what they're doing with the "text field"
