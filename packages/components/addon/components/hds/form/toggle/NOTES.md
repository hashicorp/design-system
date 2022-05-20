# NOTES - CHECKBOX

## STRUCTURE

- No "toggle" or "switch" component in Structure

## CLOUD UI

- not showcased in Storybook

- `<ToggleSwitch>`
  - https://github.com/hashicorp/cloud-ui/blob/master/packages/cloud-ui-core/addon/components/form-inputs/toggle-switch/index.hbs
    - Internally uses a `<Switch>` component
  - not used anywhere in the codebase

- `<Switch>`
  - https://github.com/hashicorp/cloud-ui/blob/master/packages/cloud-ui-core/addon/components/switch/index.hbs
    - Internally uses a `<Pds::Input @type='checkbox'>`
      - Styles are likely overridden using a `.pdsSwitch` class
    - it has an optional label if something is yielded

## CONSUL

- they have a `<ToggleButton>` but my understanding [reading the documentation](https://consul-ui-staging-cjythooc7-hashicorp.vercel.app/ui/docs/components/toggle-button) is that is a button-like element used in dropdown-like containers, not an "on/off switch"

## BOUNDARY/ROSE

- No "toggle" or "switch" component in Boundary

## ATLAS/TERRAFORM

- https://github.com/hashicorp/atlas/tree/main/frontend
- ⚠️⚠️ Notice ⚠️⚠️: interestingly enough, the "switch" is nothing more than an `<Input>` component with specific classes: `<Input class="switch is-small is-rounded is-info" />`

## WAYPOINT

- found only one instance of `<XToggle>` but not sure where it comes from

## EMBER-EUI

- doc page: https://ember-eui.netlify.app/docs/core/docs/forms/form-controls/switch
- https://github.com/prysmex/ember-eui/blob/master/packages/core/addon/components/eui-switch/index.hbs
  - ⚠️⚠️ Notice ⚠️⚠️: interestingly enough, it's a `<button>` with `role="switch"`, not the usual checkbox
  - expose among other things the following arguments
    - `aria-checked`
    - `aria-label`
    - `aria-labelledby`
