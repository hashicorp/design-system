# v3/masked-input

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v3/masked-input path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v3/masked-input path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::Form::MaskedInput::Base @isMasked={{true}} />

<Hds::Form::MaskedInput::Field @isMasked={{true}} as |F|>
  <F.Label>This is the label</F.Label>
</Hds::Form::MaskedInput::Field>
```

## Output

```hbs
<Hds::Form::MaskedInput::Base @isContentMasked={{true}} />

<Hds::Form::MaskedInput::Field @isContentMasked={{true}} as |F|>
  <F.Label>This is the label</F.Label>
</Hds::Form::MaskedInput::Field>
```
