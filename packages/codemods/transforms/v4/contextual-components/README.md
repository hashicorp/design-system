# v4/contextual-components

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/contextual-components path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/contextual-components path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::Alert as |A|>
  <A.Link::Standalone />
</Hds::Alert>

<Hds::Form::Toggle::Group as |G|>
  <G.Toggle::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Toggle::Field>
</Hds::Form::Toggle::Group>
```

## Output

```hbs
<Hds::Alert as |A|>
  <A.LinkStandalone />
</Hds::Alert>

<Hds::Form::Toggle::Group as |G|>
  <G.ToggleField as |F|>
    <F.Label>Label</F.Label>
  </G.ToggleField>
</Hds::Form::Toggle::Group>
```
