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
    "helios-design-system": {
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

Client configuration formats vary; the examples above use the common `mcpServers` format. The transport is stdio, not HTTP.

### Catalog resolution

The server prefers component, token, and icon catalogs from the application's installed packages. Tokens and icons can also resolve through the application's components package. If those catalogs cannot be resolved, the server falls back to its own HDS dependencies, which may be different versions from the application's packages.

The project root defaults to the nearest `package.json` at or above the process working directory. Set `HDS_MCP_PROJECT_ROOT` to an absolute application path to override catalog lookup independently of the working directory. This variable does not change where pnpm looks for the executable.

Documentation comes from the `docs-catalog.json` snapshot shipped with the MCP package, not from the application's dependencies.

### Telemetry

Usage telemetry is opt-in and disabled by default. When enabled, it reports how the server is used so we can find gaps in the Helios documentation and catalogs and improve the tools.

To opt in, set `HDS_MCP_TELEMETRY=1` and provide the PostHog project API key through `HDS_MCP_POSTHOG_API_KEY` in your MCP client configuration:

```json
{
  "mcpServers": {
    "helios-design-system": {
      "command": "pnpm",
      "args": ["exec", "helios-design-system-mcp"],
      "env": {
        "HDS_MCP_TELEMETRY": "1",
        "HDS_MCP_POSTHOG_API_KEY": "<posthog-project-api-key>"
      }
    }
  }
}
```

- Telemetry stays disabled when the API key is missing, even when `HDS_MCP_TELEMETRY` is set.
- Setting `DO_NOT_TRACK=1` always disables telemetry, even when `HDS_MCP_TELEMETRY` is set.
- Events are sent to PostHog's EU region with a random ID generated each time the server starts. No ID is stored on disk, no person profiles are created, and IP addresses are not used for geolocation.
- When telemetry is enabled, the server prints a notice to stderr on startup.

#### What is collected

| Event | When | Properties |
| --- | --- | --- |
| `hds_mcp_session_initialized` | Once, after the client connects | Client name and version (as the client reports them, capped at 64 characters), server version, Node.js major version, operating system platform |
| `hds_mcp_tool_called` | Every tool call | Tool name; outcome (`ok`, `miss`, `empty` or `error`); duration in milliseconds; whether it was the tool's first call in the session; total and returned match counts; whether results were truncated; the version of the HDS package the catalog came from and how it was located; age of the bundled documentation in days |
| `hds_mcp_resource_read` | Every resource read | Resource name, outcome, duration, whether it was the first read |
| `hds_mcp_prompt_requested` | Every prompt request | Prompt name, outcome |

Each tool call also reports properties specific to that tool:

| Tool | Properties |
| --- | --- |
| All searches | Query length and word count, requested result limit, name of the top result |
| `search_hds_docs` | Matched and unmatched word counts, number of results anchored to a page, top result's docs path, score and whether it is page-anchored |
| `search_hds_icons`, `search_hds_tokens`, `search_hds_docs` | Which filter kinds (`section`, `tab`, `docsPath`, `category`, `size`) were not recognized; filter values only when they match the catalog |
| `search_hds_tokens` | Whether the query is a hex color, the `type` filter |
| `get_hds_component` | Whether the name was written as an invocation, class name or module path; the component it resolved to; how many of its arguments had their values capped. On a miss: the requested name (see below), the number of suggestions and the top suggestion |
| `read_hds_docs` | Byte limit, whether children were requested, bytes returned, child and omitted passage counts, the docs path read. On a miss: whether the id names a real page, that page's docs path, and the top suggestion |

A requested component name is sent only when it has the shape of an HDS name (`Hds::Form::TextInput`, `HdsFormTextInput` or `hds/form/text-input`), uses only letters, digits, `::`, `/` and `-`, and is 64 characters or fewer. This shows which components agents expect Helios to have. Any other name is reported only as `other`.

#### What is never collected

- Search queries or the words in them, documentation ids, prompt arguments, or resource URIs
- Requested component names that are not shaped like an HDS name, and filter values the catalog does not recognize
- Tool results, documentation content, or error messages
- File paths, environment variables, or anything about your application's code

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

Set `HDS_MCP_TELEMETRY=debug` and `HDS_MCP_POSTHOG_DEV_API_KEY` to send telemetry to the development PostHog project and log each event to stderr.

## Verify with MCP Inspector

From the monorepo root:

```bash
npx -y @modelcontextprotocol/inspector node packages/mcp/dist/index.js
```

The Inspector should connect successfully and show an MCP server.

## License

This project is licensed under the [Mozilla Public License 2.0](https://github.com/hashicorp/design-system/blob/main/LICENSE).
