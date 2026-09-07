The server exposes six resources, organized into three areas; components, design tokens, and icons.

## Components

| Resource | What it provides |
|-----------------------|---|
| Component catalog index | A list of all HDS components with summary metadata: names, module paths, and basic properties |
| Component detail | Full record for a specific component by name: properties, variants, usage guidance, and API details |

This lets an AI agent answer questions like: *"What variants does the Alert component support?"* or *"What are the accepted values for the Button's color property?"*

## Design tokens

| Resource | What it provides |
|---|---|
| Token catalog index | A list of all HDS tokens with summary metadata: keys, names, and paths |
| Token detail | Full record for a specific token by key: its value, original value, and resolution chain |

This lets an AI agent answer: *"What CSS value does the `foreground-primary` token resolve to?"* or *"What tokens are available for surface colors?"*

## Icons

| Resource | What it provides |
|---|---|
| Icon catalog index | A list of all Flight icons with summary metadata and categories |
| Icon detail | Full record for a specific icon: name, variants (16px and 24px), file names, and aliases |

This lets an AI answer: *"What icon should I use for a warning state?"* or *"What are all the available icons in the 'navigation' category?"*

## Documentation lookup

Something here about website documentation lookup.

## What the MCP server does not have access to

- Your Figma files (that's the Figma MCP server's role)
- Your application's codebase
- Any design patterns or page templates not codified as components in the catalog, though it will try to interpret these to the best of it's ability using the HDS tokens.