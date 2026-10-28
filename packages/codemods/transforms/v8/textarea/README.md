# v8/textarea

Migrates HDS Textarea's implicit two-way value binding to explicit `input` and `change` handlers for HDS 8.

## Usage

```bash
npx @hashicorp/design-system-codemods v8/textarea 'app/**/*.hbs'
```

Run this before upgrading HDS, review the diff and every diagnostic, and exercise the affected forms. The command doesn't modify JavaScript classes or install dependencies.

Automatic migration requires `ember-set-helper` and either `@nullvoxpopuli/ember-composable-helpers` or `ember-composable-helpers` as direct dependencies of the nearest package. These supply the global `set` and `pick` helpers. If your application provides equivalent global helpers another way, explicitly opt in with `--helpers`. Otherwise, add a class handler manually rather than introducing helper dependencies.

## Example

```hbs
<Hds::Form::Textarea::Field @value={{this.description}} as |F|>
  <F.Label>Description</F.Label>
</Hds::Form::Textarea::Field>
```

Becomes:

```hbs
<Hds::Form::Textarea::Field
  @value={{this.description}}
  {{on "input" (pick "target.value" (set this "description"))}}
  {{on "change" (pick "target.value" (set this "description"))}}
  as |F|
>
  <F.Label>Description</F.Label>
</Hds::Form::Textarea::Field>
```

Both events preserve the old value updates, including change events dispatched without an input event. The codemod doesn't recreate the built-in's synthetic paste/cut handling. Normal paste and cut edits produce native input events.

## Supported cases

- `Hds::Form::Textarea::Base` and `Hds::Form::Textarea::Field`.
- Contextual `<F.Textarea>` inside `Hds::Form::KeyValueInputs::Field`, including the `KeyValueInputs` → `:row` → `R.Field` pattern and nested scopes. Shadowed block parameters aren't treated as HDS components.
- Simple object/property paths such as `this.description`, `this.model.samlSettings.certificate`, and `@model.description`.
- Omitted and literal values are left unchanged because they don't require caller write-back.

The codemod is idempotent and doesn't touch native textarea elements or Ember's built-in Textarea.

## Manual review

The codemod emits file/line diagnostics and leaves the invocation unchanged when:

- Existing modifiers or forwarded attributes could affect value updates. Don't assume an existing `input` handler is a setter: it might only validate. A change-only handler also needs review if other UI depends on per-keystroke state.
- `@value` is a helper result, a standalone argument such as `@value`, or another expression without a statically identifiable object/property.
- Required global helpers aren't available.

The codemod can't determine whether an object property has a writable setter. Review generated handlers for getter-only properties or immutable models and delegate updates to the owning component instead.

Only `.hbs` templates are supported. For strict-mode `.gts`/`.gjs` components, imported aliases, wrapper components, and dynamic component invocations, migrate manually. Pass only `.hbs` paths to this transform; search other files for `HdsFormTextarea`, imports of `components/hds/form/textarea/`, and contextual `.Textarea` invocations.

In a class, retain the existing `@value` binding and add a handler:

```ts
updateDescription = (event: Event) => {
  const target = event.target;
  if (target instanceof HTMLTextAreaElement) {
    this.description = target.value;
  }
};
```

Use `{{on "input" this.updateDescription}}` (import `on` from `@ember/modifier` in strict mode). Also listen to `change` if change-only events must update state.

HDS 8 also removes the built-in `ember-text-area` and `ember-view` classes. Update selectors to use `hds-form-textarea` or an application class; this transform doesn't modify CSS or test selectors.
