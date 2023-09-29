# v3/radio-card

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v3/radio-card path/to/some/glob/**/*.hbs
```

Note: to avoid any potential visual regression, make sure all instances that previously had `@layout="fixed"` now have a `@maxWidth` value defined.

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v3/radio-card path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::Form::RadioCard @name="radio-card" @value="value" @layout="fixed" />
<Hds::Form::RadioCard @name="radio-card" @value="value" @layout="fixed" as |R|>
  <R.Label>L7 permissions</R.Label>
</Hds::Form::RadioCard>

<Hds::Form::RadioCard::Group @name="radio-card-group" @layout="fixed" as |G|>
  <G.RadioCard @value="value" />
</Hds::Form::RadioCard::Group>
<Hds::Form::RadioCard::Group @name="radio-card-group" @layout="vertical" as |G|>
  <G.RadioCard @value="value" />
</Hds::Form::RadioCard::Group>
```

## Output

```hbs
<Hds::Form::RadioCard @name="radio-card" @value="value" />
<Hds::Form::RadioCard @name="radio-card" @value="value" as |R|>
  <R.Label>L7 permissions</R.Label>
</Hds::Form::RadioCard>

<Hds::Form::RadioCard::Group @name="radio-card-group" as |G|>
  <G.RadioCard @value="value" />
</Hds::Form::RadioCard::Group>
<Hds::Form::RadioCard::Group @name="radio-card-group" @layout="vertical" as |G|>
  <G.RadioCard @value="value" />
</Hds::Form::RadioCard::Group>
```
