# v4/icon

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/rich-tooltip path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/icon path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::RichTooltip as |RT|>
  <RT.Toggle @text="Toggle" />
  <RT.Bubble
    @placement="top-start"
    @enableCollisionDetection={{false}}
    @offset={{2}}
  >
    Content...
  </RT.Bubble>
</Hds::RichTooltip>
```

## Output

```hbs
<Hds::RichTooltip
  @bubblePlacement="top-start"
  @enableCollisionDetection={{false}}
  @offset={{2}}
  as |RT|
>
  <RT.Toggle @text="Toggle" />
  <RT.Bubble>
    Content...
  </RT.Bubble>
</Hds::RichTooltip>
```
