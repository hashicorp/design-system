# v4/icon

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/icon path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/icon path/to/some/glob/**/*.hbs
```

## Input

```hbs
<FlightIcon @name="test" @isInlineBlock={{false}} />
<FlightIcon @name="test" @isInlineBlock={{true}} />
```

## Output

```hbs
<Hds::Icon @name="test" />
<Hds::Icon @name="test" @isInline={{true}} />
```
