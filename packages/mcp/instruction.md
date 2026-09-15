# Try the Helios MCP server

We’re testing an MCP server that gives clients access to Helios component APIs, documentation, design tokens, and Flight icons. We plan to release it as an installable dependency, but for now you can start testing it locally from a checkout of the design system repo:

You’ll need Node.js 24.x and pnpm 10.11.0.

Clone the repo, install dependencies, and build the server:

```bash
git clone https://github.com/hashicorp/design-system.git
cd design-system
pnpm install
pnpm -F @hashicorp/design-system-mcp build
```

Then add this to your MCP client configuration, replacing the path with the absolute path to your checkout:

```json
{
  "mcpServers": {
    "helios-design-system": {
      "command": "node",
      "args": [
        "/absolute/path/to/design-system/packages/mcp/dist/index.js"
      ]
    }
  }
}
```

Restart or reload your client, then ask it about Helios components, tokens, icons, or documentation.

## What you can try

The server currently exposes these tools:

- `search_hds_components`: Find components by invocation name, class name, module path, or docs path. Use this to confirm a component name before writing a template.
- `search_hds_docs`: Search the bundled Helios documentation with natural-language queries or keywords. Results include snippets, filters, and links to the canonical docs.
- `read_hds_docs`: Read the full documentation passage returned by `search_hds_docs`, including usage examples and code snippets.

It also exposes catalog resources for clients that support MCP resources:

- `hds://components` and `hds://components/{componentName}`: Browse the component catalog or read details for a specific component.
- `hds://icons` and `hds://icons/{iconName}`: Browse Flight icons or read details for a specific icon.
- `hds://tokens` and `hds://tokens/{tokenKey}`: Browse design tokens or read details for a specific token.

The catalog and documentation data are read locally. Documentation results include canonical Helios URLs, but tool calls do not make network requests.

If you pull changes or edit the server, rebuild it before reconnecting:

```bash
pnpm -F @hashicorp/design-system-mcp build
```

You can also use the MCP Inspector for an interactive browser-based test UI:

```bash
pnpm -F @hashicorp/design-system-mcp start:dev
```
