# NOTES - RADIO

## STRUCTURE

- doc page: https://structure.hashicorp.vercel.app/?path=/story/components-radiofield--index
  - facade: https://structure.hashicorp.vercel.app/?path=/story/components-radiofield-facade--index
  - multi-line label: https://structure.hashicorp.vercel.app/?path=/story/components-radiofield--multi-line-label
    - done using simply a `<br />`: https://github.com/hashicorp/structure/blob/main/packages/pds-ember/tests/integration/components/radio-field/stories/index.stories.js#L39-L43
  - blueprints: https://structure.hashicorp.vercel.app/?path=/story/components-radio-blueprints--page
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/radio-field/index.js
  - the `id` can be passed as argument (`@id`) otherwise is generated at runtime
  - they have these arguments
    - `@invalid` (according to the comments, applies an "invalid" appearance but does _not_ modify logical validity (i.e., `:valid` or `:invalid`))
  - **no** tracked properties "dirty" and "touched" (I think because it uses `<Pds::Input>` internally)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/radio-field/index.hbs
  - it uses `<Pds::Input>` internally with `type="radio"`
  - it has a `<label>` sibling element
    - the label contains:
      - a `pds-radioField__facadeWrapper`
        - comment: "required so that line-height is inherited for vertical alignment with label text"
        - in reality, is just a CSS grid item
      - the <Pds::RadioField::Facade />
      - the `pds-radioField__text` text that yields its content
        - 🚨🚨 IMPORTANT 🚨🚨: this also hashes the `id` and pass it to the yielded content, probably we will have to do the same too if they use it in this way for some reasons (not sure why)
- https://github.com/hashicorp/structure/blob/main/packages/pds-ember/addon/components/pds/radio-field/facade/index.hbs
  - it uses a "facade" element to have custom styling of the root element
    - internally uses an inline SVG

## CLOUD UI

Found **no** occurrencies of `<Pds::RadioField>`

Found 3 instances of `<Pds::Input @type='radio'>` in 2 files (one of them is used inside the `<RadioCard>`)

Notice: there is also the `<RadioCard>` component used quite a few times, but that's another component (internally it uses `<Pds::Input @type='radio'>`)

## CONSUL

- apparently it's using a `<FormGroup>` component that yields a `radio` element
  - https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/form-group/element/radio/index.hbs
    - `@name`
    - `@value`
    - `{{did-insert ...}}`
    - `{{on 'change' ...}}`
  - it's not used anywhere

Found a few native `<input type="radio">` (some of them inside `RadioGroup`, `RadioCard` and `FormGroup/Element/Radio` components)

Found one instance of `<RadioCard>` (internally uses a native `<input type="radio">`)

## BOUNDARY/ROSE

- doc page: https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-radio-radio--basic
- https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/radio/radio/index.hbs
  - (under the "radio" folder they have three sub-folders: `radio`, `group` and `card` )
  - they **do not** use a @contextual argument to allow consumers to use a contentual component syntax for the component invocation
    - uses a third-party `<RadioButton>` component internally (see https://github.com/yapplabs/ember-radio-button)
    - the component exposes the following props
      - `@inline` - used to display the container as `display: inline-block` and pre-defined right margin
      - `@name`
      - `@value`
      - `@label`
      - `@helperText`
      - **no** `@link` + `@linkText` as in input
      - `@error`
      - `@disabled`
      - `@changed` (passed to the `RadioButton` component)
      - `@groupValue` (passed to the `RadioButton` component)
      - generates a UID internally (in JS backing class) used for "ID", "for", "aria-describedby"
    - has siblings:
      - `<label>` with `@icon`, `@label` value and optional `@helperText`, plus a strange `<span class='radio-card-overlay'>`
        - seems the error is used inside the `helperText`??

- doc page (group): https://boundary-ui-storybook.vercel.app/?path=/story/rose-form-radio-group--basic
- https://github.com/hashicorp/boundary-ui/tree/main/addons/rose/addon/components/rose/form/radio/group
  - https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/addon/components/rose/form/radio/group/index.hbs

- Notice: seems it's mostly used via `RadioGroup` component, not via `Radio` (both yielded).

## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend

It's a bit messy: I've found instances of
- `<RadioButton>` (third-party component, see https://github.com/yapplabs/ember-radio-button)
- `{{radio-button}}` (maybe invocation of the same component with old syntax?)
- a bunch of native `<input type="radio">` usages
- a bunch of places where a radio cars is used via `class="radio-card"`

## WAYPOINT

- found 5 instances of `<Pds::RadioField>` in one file
  - `@id`
  - `name`
  - `value`
  - `checked`
  - `{{on "input" ...}}`
- found no instances of `<input type="radio">`

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/radio
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-radio/index.hbs
  - they don't use the @controlOnly argument to allow consumers to generate just the simple "select", instead of the what they're doing with the "text field"
  - expose the following arguments
    - `@id`
    - `@disabled`
    - `@label`
    - `@checked`
    - no events??
    - no `@indeterminate` argument (as in checkbox; doesn't make sense)
    -  `<:label>` block

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/radio-group
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-checkbox-group/index.hbs
  - expose the following arguments
    - `@legend`
    - `@options`
    - `@valueKey`
    - `@onChange`
