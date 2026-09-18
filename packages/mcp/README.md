# Helios Design System MCP server

Give your AI assistant access to [Helios Design System](https://helios.hashicorp.design) component APIs, design tokens, icons, and usage guidance through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

The `@hashicorp/design-system-mcp` package helps your assistant:

- Find Ember components and look up their arguments, accepted values, blocks, and yielded components.
- Choose design tokens by name or value and retrieve their CSS variables.
- Find Flight icons by name, keyword, category, or size.
- Read documentation examples, accessibility guidance, and design recommendations.

The server runs locally over **stdio**. Its tools are read-only and query local catalogs without making network requests. No API key or account is required.

## Contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Tools and resources](#tools-and-resources)
- [Data sources and configuration](#data-sources-and-configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 24 or later.
- [pnpm](https://pnpm.io/installation) for the commands below.
- An MCP client that supports local stdio servers, such as Claude Code, Claude Desktop, Cursor, or VS Code with GitHub Copilot.

### 1. Install in your application

Run this from the application whose Helios packages you want to query:

```bash
pnpm add --save-dev @hashicorp/design-system-mcp
```

Local installation records the server version in your application's lockfile and lets it resolve your installed Helios catalogs. It runs as a separate development tool; do not import it into your application or include it in your production bundle.

### 2. Connect your MCP client

Add the following server entry to your client's MCP configuration. Replace `/absolute/path/to/application` with the directory containing your application's `package.json`. In a monorepo, use the application workspace directory.

Using `--dir` makes both executable lookup and catalog resolution independent of where your client starts.

<details open>
<summary>Claude Code, Claude Desktop, and Cursor</summary>

Use the `mcpServers` configuration format:

- **Claude Code:** `.mcp.json` in your project.
- **Claude Desktop:** `claude_desktop_config.json`, accessible through **Settings → Developer → Edit Config**.
- **Cursor:** `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` for all projects.

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

</details>

<details>
<summary>VS Code with GitHub Copilot</summary>

Add this to `.vscode/mcp.json`. VS Code uses `servers` rather than `mcpServers`:

```json
{
  "servers": {
    "helios-design-system": {
      "type": "stdio",
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

See the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) for user-level configuration and server controls.

</details>

For other clients, configure a **stdio** server with the same command and arguments using the client's configuration format. If your client already runs in the application directory, you can shorten the arguments to `["exec", "helios-design-system-mcp"]`.

### 3. Verify the connection

Restart or reload your client's MCP connection and enable the server's tools. Ask your assistant:

> Use the Helios MCP server to look up the API for Hds::Button. Include the catalog package version and where it was resolved from.

A successful `get_hds_component` call returns `found: true`, the component's arguments and blocks, and `source.version` / `source.resolvedVia` metadata. Check this metadata to confirm which package supplied the answer; a successful connection alone does not guarantee the catalog matches your application's version.

## Usage

Try prompts such as:

> Use Helios to show me how to build an alert with a title and description. Check the component API and accessibility guidance first.

> Find the Helios foreground-action color token and give me its CSS variable and value.

> Find a warning icon available at 16px in the Helios icon catalog.

> Find the Helios guidance for form validation and cite the documentation.

For component work, the useful sequence is **find the component → inspect its API → search and read its documentation**. Component search matches names and paths; documentation search handles questions about usage and design. Read the full documentation passage to retrieve code examples, since search results contain only snippets.

## Tools and resources

### Tools

Your assistant chooses and calls these tools through the MCP client. Names may appear with a client-specific server prefix.

| Tool                    | Purpose                                                                              | Required input                          | Optional inputs                           |
| ----------------------- | ------------------------------------------------------------------------------------ | --------------------------------------- | ----------------------------------------- |
| `search_hds_components` | Find components by invocation name, class name, module path, or documentation path.  | `query`                                 | `limit`                                   |
| `get_hds_component`     | Read an individual component's API, including argument types and yielded components. | `name`                                  | —                                         |
| `search_hds_tokens`     | Find tokens by name or value, including CSS variables and resolved values.           | `query`                                 | `limit`, `type`, `category`               |
| `search_hds_icons`      | Find icons by name or keyword, including available sizes.                            | `query`                                 | `limit`, `category`, `size`, `hasMapping` |
| `search_hds_docs`       | Search bundled documentation for guidance and examples.                              | `query`                                 | `limit`, `section`, `tab`, `docsPath`     |
| `read_hds_docs`         | Read a documentation passage with its Markdown and code examples.                    | `id` from a documentation search result | `includeChildren`, `maxBytes`             |

Use `get_hds_component` for precise API questions; it accepts names such as `Hds::Button`, `HdsButton`, `button`, or `hds/button`. Look up yielded components separately to see their own arguments.

For documentation, scope searches with the component's `docsPath` when available. Use `tab: "Version history"` for version and changelog questions. Search results are relevance-ranked: read the passages and check `pageAnchored` and `unmatchedTerms` before treating a result as evidence of a supported feature.

### Resources

Clients with MCP resource support can also read catalog indexes and individual records as JSON:

| Catalog    | Index URI          | Individual record URI template     |
| ---------- | ------------------ | ---------------------------------- |
| Components | `hds://components` | `hds://components/{componentName}` |
| Tokens     | `hds://tokens`     | `hds://tokens/{tokenKey}`          |
| Icons      | `hds://icons`      | `hds://icons/{iconName}`           |

Use keys returned by the catalog and URL-encode them when constructing individual record URIs. Search tools are usually the most direct way to find a specific item without loading a full index.

## Data sources and configuration

### Catalog resolution

The server looks for each catalog in this order:

| Catalog       | Resolution order                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Components    | Application's `@hashicorp/design-system-components` → server's dependency                                   |
| Tokens        | Application's `@hashicorp/design-system-tokens` → application's components dependency → server's dependency |
| Icons         | Application's `@hashicorp/flight-icons` → application's components dependency → server's dependency         |
| Documentation | `docs-catalog.json` snapshot shipped with the MCP package                                                   |

If an application's catalog cannot be resolved, the server falls back to its own dependencies. Those versions may differ from your application's, including when an older Helios package does not ship a catalog.

Component, token, and icon responses include `source.version` and `source.resolvedVia` (`project-root`, `components`, or `default`) to identify the resolved package version and lookup location. `default` indicates the server's fallback lookup.

Documentation is a bundled snapshot, not a live website search or documentation selected for your application's package version. Responses include a `bundledAt` timestamp and canonical URLs so you can check freshness and open the current page. For exact component arguments, prefer the component API catalog over prose documentation.

### Project root override

By default, the project root is the nearest directory containing a `package.json` at or above the server's working directory. If none is found, the server uses the working directory itself.

Set `HDS_MCP_PROJECT_ROOT` in the server process environment to override catalog lookup. For clients using the configuration examples above, add an `env` field alongside `command` and `args`:

```json
{
  "env": {
    "HDS_MCP_PROJECT_ROOT": "/absolute/path/to/application"
  }
}
```

The override changes catalog lookup only; it does not change where pnpm looks for the executable. Use `--dir` for that.

Catalogs are cached in memory. Restart the MCP server after changing installed Helios packages or the project root.

## Troubleshooting

| Symptom                                                     | What to check                                                                                                                                                                                             |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client cannot find `pnpm` or Node.js                        | Ensure both are available to the client process and that it uses Node.js 24 or later. Desktop apps may have a different `PATH` from your terminal; use an absolute path to the pnpm executable if needed. |
| `helios-design-system-mcp` is not found                     | Confirm the development dependency is installed in the application selected by `--dir`.                                                                                                                   |
| Server connects, but answers reflect another Helios version | Inspect `source.version` and `source.resolvedVia`. Check the application path and whether its packages ship the requested catalogs, then restart the server.                                              |
| Catalog loading fails                                       | Check the client's server logs for the failing catalog. Reinstall dependencies if files are missing; include the package versions and error when reporting an issue.                                      |
| Documentation looks outdated                                | Check `bundledAt` and follow the result's canonical URL for the live page. Documentation refreshes come with updated MCP snapshots.                                                                       |
| Running the server in a terminal appears to hang            | The stdio server waits for MCP messages on stdin. Connect through an MCP client or use the Inspector described below. It does not serve an HTTP URL.                                                      |

Server diagnostics are written to stderr; stdout is reserved for MCP messages. If an issue persists, [open an issue](https://github.com/hashicorp/design-system/issues) with your client, Node.js and package versions, configuration, and relevant server logs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, testing, catalog generation, and release guidance. Development uses Node.js 24.x and pnpm 10.11.0.

After installing workspace dependencies, run this command from the monorepo root:

```bash
pnpm -F @hashicorp/design-system-mcp start:dev
```

`start:dev` builds the server, watches for changes, and launches the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector). Connect using stdio, list the tools, and call `get_hds_component` with `{"name":"Hds::Button"}` to verify a catalog lookup. You can also inspect the resources listed above.

To connect an MCP client directly to a local build, use `node` as the command and the absolute path to `packages/mcp/dist/index.js` as its argument. Set `HDS_MCP_PROJECT_ROOT` to query a separate application's installed catalogs.

See the [changelog](CHANGELOG.md) for MCP package changes and the [Helios documentation](https://helios.hashicorp.design) for design system guidance.

## License

This project is licensed under the [Mozilla Public License 2.0](https://github.com/hashicorp/design-system/blob/main/LICENSE).
