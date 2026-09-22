# Try the Helios MCP server

The Helios MCP server gives AI assistants access to Helios component APIs, documentation, design tokens, and icons. Install it from [npm](https://www.npmjs.com/package/@hashicorp/design-system-mcp) as a development dependency of your application.

## Install the server

You’ll need Node.js 24 or later and an MCP client that supports local servers using the standard input/output (`stdio`) transport. The examples below use pnpm.

Run this command from your application directory:

```bash
pnpm add --save-dev @hashicorp/design-system-mcp
```

The package includes the compiled server, so you don't need to clone or build the HDS repository. It runs as a separate development tool; don't import it into your application or include it in your production bundle.

## Connect your MCP client

Add this to your MCP client configuration, replacing `/absolute/path/to/application` with the absolute path to the application where you installed the package:

```json
{
  "mcpServers": {
    "helios-design-system": {
      "command": "pnpm",
      "args": [
        "--dir",
        "/absolute/path/to/application",
        "exec",
        "helios-design-system-mcp"
      ]
    }
  }
}
```

The `--dir` option ensures that pnpm finds the locally installed server and starts it in your application directory. If your client already starts there, you can use `"args": ["exec", "helios-design-system-mcp"]` instead.

Client configuration formats vary. Check your client's documentation for where to add the configuration and whether you need to adapt the format above.

Restart or reload your client, then ask it about Helios components, tokens, icons, or documentation. For example:

> Find the HDS Button component and read its full-width usage guidance before showing me how to use it in my Ember template.

## What you can try

The server currently exposes these tools:

- `search_hds_components`: Find components by invocation name, class name, module path, or docs path. Use this to confirm a component name before writing a template.
- `get_hds_component`: Read a component's API, including arguments, accepted values, blocks, and yielded components.
- `search_hds_docs`: Search the bundled Helios documentation with natural-language queries or keywords. Results include snippets, filters, and links to the canonical docs.
- `read_hds_docs`: Read the full documentation passage returned by `search_hds_docs`, including usage examples and code snippets.
- `search_hds_icons`: Find icons by name or keyword and check their available sizes.
- `search_hds_tokens`: Find design tokens, their values, and CSS variable names.

It also exposes catalog resources for clients that support MCP resources:

- `hds://components` and `hds://components/{componentName}`: Browse the component catalog or read details for a specific component.
- `hds://icons` and `hds://icons/{iconName}`: Browse icons or read details for a specific icon.
- `hds://tokens` and `hds://tokens/{tokenKey}`: Browse design tokens or read details for a specific token.

## Data sources

The server prefers component, token, and icon catalogs from your application's installed HDS packages. If those catalogs can't be resolved, it falls back to its own HDS dependencies, which may be different versions. Documentation comes from a snapshot bundled with the server.

The catalog and documentation data are read locally. Documentation results include canonical Helios URLs, but tool calls do not make network requests.

## Inspect the server

For an interactive browser-based test UI, run the MCP Inspector from your application directory:

```bash
pnpm dlx @modelcontextprotocol/inspector pnpm exec helios-design-system-mcp
```
