# @hashicorp/design-system-mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes Helios Design System knowledge — component APIs, design tokens, Flight icons and the documentation site — to MCP-capable clients over stdio.

It answers the questions an agent actually asks while writing HDS code: does this component exist, what arguments does it take, which token holds this color, what is this icon called, and how is this meant to be used.

## Requirements

- Node.js 24
- pnpm 10

## Install

The package is not published yet. Build it from a checkout of this monorepo:

```bash
pnpm install
pnpm -F @hashicorp/design-system-mcp build
```

That produces `packages/mcp/dist/index.js`, which is the server entry point.

## Configure a client

Point your client at the built file with an absolute path. The shape of the config varies by client; the server itself only needs `command`, `args` and optionally `env`.

```json
{
  "mcpServers": {
    "helios-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/packages/mcp/dist/index.js"],
      "env": {
        "HDS_MCP_PROJECT_ROOT": "/absolute/path/to/your/app"
      }
    }
  }
}
```

`HDS_MCP_PROJECT_ROOT` should point at the app whose installed HDS versions you want described. It is optional but recommended — see [Where the data comes from](#where-the-data-comes-from). Without it the server anchors on its own working directory, which for most clients is not your project.

To verify a build interactively:

```bash
pnpm -F @hashicorp/design-system-mcp inspect
```

## Tools

| Tool                    | Use it to                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `search_hds_components` | Find a component by name and recover its exact invocation spelling.                                                                   |
| `get_hds_component`     | Read one component's full API: arguments with types, requiredness and accepted values, plus blocks and yielded contextual components. |
| `search_hds_docs`       | Search the documentation corpus and get back ranked passages with snippets and canonical URLs.                                        |
| `read_hds_docs`         | Read one documentation passage in full, by the `id` a search result carries, including its code examples.                             |
| `search_hds_tokens`     | Find a design token by name or value, and get the `var(--token-…)` to write.                                                          |
| `search_hds_icons`      | Find a Flight icon by name or keyword, to pick a valid `@name` for `<Hds::Icon>`.                                                     |

The typical path is `search_hds_components` → `get_hds_component` for API questions, and `search_hds_docs` → `read_hds_docs` for usage questions.

Every tool is read-only, performs no network requests, and returns both human-readable text and `structuredContent`.

The four catalog tools report their data source as a `source` field. The two docs tools report `bundledAt` and `siteBaseUrl` instead, because the docs corpus is versioned differently — see below.

## Resources

The same catalogs are also exposed as resources, for clients that browse rather than call:

| URI                                                     | Contents                   |
| ------------------------------------------------------- | -------------------------- |
| `hds://components` · `hds://components/{componentName}` | Component index and detail |
| `hds://tokens` · `hds://tokens/{tokenKey}`              | Token index and detail     |
| `hds://icons` · `hds://icons/{iconName}`                | Icon index and detail      |

Detail templates support argument completion. Many clients do not invoke resources automatically — prefer the tools if you want an agent to reach this data on its own.

## Where the data comes from

Component, token and icon data is read from the catalogs shipped inside the installed HDS packages, resolved at load time in this order:

1. `HDS_MCP_PROJECT_ROOT`, or the nearest `package.json` above the working directory
2. wherever `@hashicorp/design-system-components` resolves from (tokens and icons only)
3. the server's own dependencies

**This means the server describes the versions your project has installed, not the newest released ones.** The four catalog tools report a `source` field naming the resolved version and the anchor that supplied it:

```json
{ "version": "6.5.0", "resolvedVia": "project-root" }
```

`"resolvedVia": "default"` means no HDS install was found at your project root and the server fell back to its own dependencies. It does not error — check this field first if a component or token looks wrong or missing.

Documentation is different: it is a **snapshot** of [helios.hashicorp.design](https://helios.hashicorp.design) committed to this package as `docs-catalog.json`, not a live fetch, and not tied to your installed version. Responses carry a `bundledAt` timestamp and every passage carries its canonical URL, so a client that needs the current page can fetch it. Regenerate the snapshot after changing `website/docs`:

```bash
pnpm -F @hashicorp/design-system-mcp catalog:docs
```

## Development

From `packages/mcp`:

```bash
pnpm start        # rebuild and restart the server on change
pnpm start:dev    # rebuild and run under the MCP Inspector
pnpm test         # vitest
pnpm typecheck
pnpm lint
```

Notes for contributors:

- **Never write to stdout.** The stdio transport reserves it for protocol messages; all diagnostics go to stderr.
- Register tools, resources and prompts by adding descriptors to the arrays in the relevant `index.ts` rather than calling the server methods directly.
- Catalog data must conform to the Zod schema in the matching `src/stores/<name>/schema.ts`.
- User-facing changes need a changeset.

## License

MPL-2.0
