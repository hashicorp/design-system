# design-system-mcp

An MCP server for the Helios Design System.

## Installation

Requires Node.js 24 or later. Install the server as a development dependency of the application whose Helios packages you want to query:

```bash
pnpm add --save-dev @hashicorp/design-system-mcp
```

The server runs as a separate development tool; do not import it into your application or include it in your production bundle. Local installation pins the server version in your application's lockfile.

## MCP client configuration

Configure your MCP client to launch the locally installed binary from your application directory:

```json
{
  "mcpServers": {
    "helios": {
      "command": "pnpm",
      "args": ["exec", "helios-design-system-mcp"]
    }
  }
}
```

If your client does not start in the application directory, use pnpm's `--dir` option so both binary lookup and catalog resolution use the correct project:

```json
{
  "mcpServers": {
    "helios": {
      "command": "pnpm",
      "args": ["--dir", "/absolute/path/to/application", "exec", "helios-design-system-mcp"]
    }
  }
}
```

Client configuration formats vary; the examples above use the common `mcpServers` format. The transport is stdio, not HTTP.

### Catalog resolution

The server prefers component, token, and icon catalogs from the application's installed packages. Tokens and icons can also resolve through the application's components package. If those catalogs cannot be resolved, the server falls back to its own HDS dependencies, which may be different versions from the application's packages.

The project root defaults to the nearest `package.json` at or above the process working directory. Set `HDS_MCP_PROJECT_ROOT` to an absolute application path to override catalog lookup independently of the working directory. This variable does not change where pnpm looks for the executable.

Documentation comes from the `docs-catalog.json` snapshot shipped with the MCP package, not from the application's dependencies.

## Scripts

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test`
- `pnpm test:dist-files`
- `pnpm start`

## Local usage

From the monorepo root:

```bash
pnpm -F @hashicorp/design-system-mcp build
pnpm -F @hashicorp/design-system-mcp start
```

## Verify with MCP Inspector

From the monorepo root:

```bash
npx -y @modelcontextprotocol/inspector node packages/mcp/dist/index.js
```

The Inspector should connect successfully and show an MCP server.

## Publishing

This package uses the repository's Changesets release and release-candidate workflows. Add a Changeset for consumer-facing changes. Like the components package, `prepublishOnly` builds and checks the required files before publishing. For local tarball testing, run `pnpm build` before `pnpm pack`.

The documentation catalog is a committed generated asset. After relevant website documentation changes, regenerate it with `pnpm catalog:docs`, review the output, and include it with a Changeset. It is not regenerated when consumers install the package.

## License

Licensed under the [Mozilla Public License 2.0](LICENSE.md). Source code is available in the [Helios Design System repository](https://github.com/hashicorp/design-system/tree/main/packages/mcp).
