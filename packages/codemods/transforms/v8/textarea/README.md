# v8/textarea

Migrates HDS Textarea's implicit two-way value binding to explicit `input` and `change` handlers for HDS 8.

## Usage

```bash
npx @hashicorp/design-system-codemods v8/textarea 'app/**/*.{hbs,gjs,gts}' --dry
npx @hashicorp/design-system-codemods v8/textarea 'app/**/*.{hbs,gjs,gts}'
```

Run this before upgrading HDS, review the diff and every diagnostic, and exercise the affected forms. `--dry` plans changes without writing; add `--print` to inspect the generated files. Backing `.js`/`.ts` files are discovered automatically, even when they aren't included in your glob. The command doesn't install application dependencies.

The primary migration adds a bound value-update handler to the backing class and imports Ember's `set`. It uses Ember's built-in `fn` and `on` helpers, so no additional application helper dependencies are needed. In strict-mode `.gjs`/`.gts` files it also adds or reuses the necessary imports.

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
  {{on "input" (fn this.hdsTextareaValueChange this "description")}}
  {{on "change" (fn this.hdsTextareaValueChange this "description")}}
  as |F|
>
  <F.Label>Description</F.Label>
</Hds::Form::Textarea::Field>
```

The backing native class receives a shared handler (with type annotations in TypeScript):

```js
import { set } from '@ember/object';

// Inside the existing class:
hdsTextareaValueChange = (object, key, event) => {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) {
    throw new TypeError('Expected a textarea event target');
  }
  set(object, key, target.value);
};
```

Classic `Component.extend(...)` and `Controller.extend(...)` objects receive an `action(function (...) { ... })` property instead. Template-only strict-mode components receive a module-level handler. Existing import aliases are reused; new imports and handlers avoid name collisions.

Both events preserve the old value updates, including change events dispatched without an input event. Existing event handlers are retained after the generated setters, so validation handlers can read the updated value. The codemod doesn't recreate the built-in's synthetic paste/cut handling. Normal paste and cut edits produce native input events.

## Supported cases

- `Hds::Form::Textarea::Base` and `Hds::Form::Textarea::Field`.
- Imported aliases of these components in `.gjs`/`.gts`, using direct default imports or named imports from `@hashicorp/design-system-components/components`.
- Colocated `.hbs` + `.js`/`.ts`, pod `template.hbs` + `component.js`/`controller.js`, classic `templates/components/` + `components/`, and route `templates/` + `controllers/` pairs with an identifiable default-exported native class or classic `.extend(...)` object.
- Contextual `<F.Textarea>` inside `Hds::Form::KeyValueInputs::Field`, including the `KeyValueInputs` → `:row` → `R.Field` pattern and nested scopes. Shadowed block parameters aren't treated as HDS components.
- Simple object/property paths such as `this.description`, `this.model.samlSettings.certificate`, and `@model.description`.
- Contextual row objects are passed to the handler using `fn`; block-local values aren't referenced from JavaScript class scope.
- Omitted and literal values are left unchanged because they don't require caller write-back.

The codemod is idempotent and doesn't touch native textarea elements or Ember's built-in Textarea. It plans all files before writing: a parser error aborts the run without writing template or backing-file changes. Ambiguous backing-file matches also abort instead of guessing.

### Template-only fallback

When no backing class can be identified for a `.hbs` template, the previous template-only migration is still available if the nearest package directly depends on `ember-set-helper` and either `@nullvoxpopuli/ember-composable-helpers` or `ember-composable-helpers`. This generates `pick`/`set` handlers without changing JavaScript. `--helpers` explicitly opts into this fallback when equivalent global helpers are provided another way. Otherwise, a diagnostic requests manual migration. No backing class is fabricated.

## Manual review

The codemod emits file/line diagnostics and leaves the invocation unchanged when:

- Forwarded attributes could affect value updates.
- `@value` is a helper result, a standalone argument such as `@value`, or another expression without a statically identifiable object/property.
- A directly bound `this` property is declared readonly or has a getter without a setter in the backing class.
- A block parameter shadows the required helper or handler.
- An imported component alias is shadowed in JavaScript. This conservatively leaves that alias unchanged throughout the module.
- No backing class can be identified and the fallback global helpers aren't available. Existing modifiers also require review in this fallback.

The codemod can't determine writability of inherited or nested properties. Review generated handlers for immutable models and delegate updates to the owning component instead.

Wrapper components, re-exports, namespace imports, dynamic component invocations, inline `hbs` strings, and nonstandard backing-file layouts require manual migration. Search for `HdsFormTextarea`, imports of `components/hds/form/textarea/`, and contextual `.Textarea` invocations to review coverage.

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
