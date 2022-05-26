# Validation

## Structure

Structure shares the same [validation guidelines](https://structure.hashicorp.vercel.app/?path=/docs/guides-forms-validation--page) with [Cloud UI](https://cloud-ui-storybook-hashicorp.vercel.app/?path=/docs/design-system_guides-forms-validation--page).

It provides a few patterns on how an [error message](https://structure.hashicorp.vercel.app/?path=/story/components-error-message--index) should be placed in relation to a [text input](https://github.com/hashicorp/structure/blob/main/packages/pds-ember/tests/dummy/app/components/docs/form-field/index.hbs), [select](https://github.com/hashicorp/structure/blob/main/packages/pds-ember/tests/dummy/app/components/docs/form-field/select.hbs) and [textarea](https://github.com/hashicorp/structure/blob/main/packages/pds-ember/tests/dummy/app/components/docs/form-field/textarea.hbs), proposing the use of a `@invalid`/`@isInvalid` boolean to change the visual appearance of a form control.

## Cloud UI

A [`FieldError`](https://cloud-ui-storybook-hashicorp.vercel.app/?path=/story/design-system_guides-forms-validation--page) utility ([see the code](https://github.com/hashicorp/cloud-ui/blob/7204a64a1f6c9962b163ac8336f2ffc440e3fa28/packages/cloud-ui-core/addon/components/with-errors/field-error/index.hbs)) is used to help with showing [error messages](https://cloud-ui-storybook-hashicorp.vercel.app/?path=/story/design-system_components-error-message--index) next to a form field.

There is also a [`FormError`](https://cloud-ui-storybook-hashicorp.vercel.app/?path=/story/with-errors--with-errors) utility ([see the code](https://github.com/hashicorp/cloud-ui/blob/master/packages/cloud-ui-core/addon/components/with-errors/form-error/index.hbs)) that collects errors at the form level and highlights them in a [banner](https://cloud-ui-storybook-hashicorp.vercel.app/?path=/story/design-system_components-banner--index) at the top of the form.

Both utilities are built to support multiple error entries.

## Boundary (Rose)

A [Basic Form Errors](https://boundary-ui-storybook.vercel.app/?path=/docs/rose-form-errors--basic-form-errors) component allows for multiple [Basic Form Error Messages](https://boundary-ui-storybook.vercel.app/?path=/docs/rose-form-errors-message--basic-form-error-message) to be rendered ([see the code](https://github.com/hashicorp/boundary-ui/tree/main/addons/rose/addon/components/rose/form/errors)).

It uses an `@error` boolean to change the visual appearance of a form control and a contextual `errors` that supports multiple error messages ([see invocation example](https://github.com/hashicorp/boundary-ui/blob/main/ui/admin/app/components/form/managed-group/index.hbs#L16-L33)).

## Consul

Consul uses a [validate modifier](https://consul-ui-staging-cjythooc7-hashicorp.vercel.app/ui/docs/modifiers/validate) ([see the code](https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/modifiers/validate.js)) to show a messages when the `onchange` event is dispatched on the associated form control.

It also uses a [`state-chart` helper](https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/helpers/state-chart.js) to manage the states of a form control and [displays associated errors based on it](https://github.com/hashicorp/consul/blob/main/ui/packages/consul-ui/app/components/form-input/index.hbs).

## Nomad

## Packer

## Terraform (Atlas)

## Vault

## Waypoint
