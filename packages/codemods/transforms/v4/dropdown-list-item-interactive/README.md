# v4/icon

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/icon path/to/some/glob/**/*.hbs
```

*Note:* aside from the codemod, which serves to update the component invocations, you will need to ensure that any style and/or testing code that uses CSS selectors from FlightIcon (`.flight-icon`) is migrated to the new component classes (`.hds-icon`). We suggest using a simple “find-and-replace” as a suitable strategy for updating these selectors. 
## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/icon path/to/some/glob/**/*.hbs
```

## Input

```hbs
<FlightIcon @name="test" />
<FlightIcon @name="test" @isInlineBlock={{false}} />
<FlightIcon @name="test" @isInlineBlock={{true}} />
```

## Output

```hbs
<Hds::Icon @name="test" />
<Hds::Icon @name="test" />
<Hds::Icon @name="test" @isInline={{true}} />
```

## Optional arguments

### `--preserve-layout`

Adding this argument when running the codemod will force any `FlightIcon` component without the `@isInlineBlock` argument set to have the `@isInline` argument set to `true` when it is converted to the `Hds::Icon` component. This can be used to preserve the old default `display: inline-block` styling of the icon. It is strongly suggested that this option only be used as a final resort as doing so makes it difficult to determine which icons *actually* need to display inline.

### Input

```hbs
<FlightIcon @name="test" />
```

### Output

```hbs
<Hds::Icon @name="test" @isInline={{true}} />
```
