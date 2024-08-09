# v4/icon

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/dropdown-list-item-interactive path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/dropdown-list-item-interactive path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::Dropdown as |dd|>
  <dd.Title @text='Title text' />
  <dd.Interactive @href='#' @text='Edit' />
</Hds::Dropdown>
```

## Output

```hbs
<Hds::Dropdown as |dd|>
  <dd.Title @text='Title text' />
  <dd.Interactive @href='#'>Edit</dd.Interactive>
</Hds::Dropdown>
```
