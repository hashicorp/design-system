The Helios Design System (HDS) MCP server gives AI assistants structured access to our component APIs, documentation, design tokens, and Flight icons. It helps an assistant find current HDS resources and apply our guidance while you design, build, or review an application.

The server implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), an open standard for connecting AI applications to external tools and data sources.

!!! Information

**Early access**

The server isn't published as an installable package yet. To try it, run the server from a local checkout of the [HDS repository](https://github.com/hashicorp/design-system) and connect your MCP client to the compiled server.

!!!

## What the server provides

After you connect the server, your AI assistant can consult:

- Exact component invocation names and API details.
- Component usage, accessibility, and content guidance.
- Design token names and resolved values.
- Flight icon names, sizes, and variants.

Your assistant can use these sources when HDS information is relevant to your task. The server provides context and guidance. It doesn't generate application files, install dependencies, or modify your project.

## Set up the server

### Requirements

You need:

- Node.js 24.x
- pnpm 10.11.0
- An MCP client that supports local servers using the standard input/output (`stdio`) transport

### Build the server

Clone the HDS repository, install its dependencies, and build the MCP package.

```bash
git clone https://github.com/hashicorp/design-system.git
cd design-system
pnpm install
pnpm -F @hashicorp/design-system-mcp build
```

### Connect an MCP client

Add the following server definition to your MCP client configuration. Replace `/absolute/path/to/design-system` with the absolute path to your local checkout.

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

MCP clients use different configuration files and may use a different property name for local servers. Refer to your client's documentation if it doesn't accept this configuration format.

Restart or reload your MCP client after updating its configuration.

### Verify the connection

Ask your client a question that requires HDS information, for example:

> Find the HDS component for an advanced data table and show me its exact invocation name.

Your client should call `search_hds_components` and return one or more matching components. If your client displays connected servers or tools, confirm that `helios-design-system-mcp` and its three tools are available.

## How the server retrieves HDS guidance

The server separates discovery from detailed documentation so your assistant can retrieve only the context needed for a task. Depending on your request, it can:

1. Search for a component with `search_hds_components` to confirm that it exists and get its exact invocation name.
2. Pass the component's `docsPath` to `search_hds_docs` to find relevant guidance.
3. Pass a search result's `id` to `read_hds_docs` to read the complete passage, including code examples.
4. Read token or icon resources when the task requires exact asset metadata.

For example, you can ask:

> Find the HDS button component, then read the documentation for making it full width.

Your client can complete this as a sequence of component search, documentation search, and documentation read operations.

### Example prompts

- "Which HDS component should I use for a confirmation dialog?"
- "How do I add sorting to an HDS Advanced Table?"
- "Review this template against the HDS Button accessibility guidance."
- "Find the design token for the primary interactive color."
- "Find the Flight icon for copying content and list its available sizes."
- "What changed in the latest version of the HDS Modal?"

Include relevant context in your request, such as the component name, task, framework, or documentation area. Specific requests help the server return more relevant passages.

## Available tools

Tools let an MCP client search and read HDS information. All tools are read-only and operate on local catalogs.

| Tool | Purpose | Inputs |
|------|---------|--------|
| `search_hds_components` | Finds components by invocation name, class name, module path, or documentation path. Use it to confirm names and spelling before writing a template. | `query`; optional `limit` |
| `search_hds_docs` | Searches a bundled snapshot of the HDS documentation and returns ranked passages, snippets, and canonical URLs. | `query`; optional `limit`, `section`, `tab`, and `docsPath` filters |
| `read_hds_docs` | Reads the complete Markdown for a passage returned by `search_hds_docs`, including usage examples and code snippets. | `id`; optional `includeChildren` and `maxBytes` |

## Available resources

Resources expose structured catalogs to clients that support MCP resources.

| Resource | Purpose |
|----------|---------|
| `hds://components` | Lists the component catalog and summary metadata. |
| `hds://components/{componentName}` | Returns the detailed record for a component. |
| `hds://icons` | Lists Flight icons, categories, and available assets. |
| `hds://icons/{iconName}` | Returns the detailed record for a Flight icon. |
| `hds://tokens` | Lists design tokens and their resolved values. |
| `hds://tokens/{tokenKey}` | Returns the detailed record for a design token. |

The component, icon, and token detail resources support name completion. Resource support varies by MCP client. You can still search components and documentation when your client doesn't expose resources.

The server doesn't currently provide MCP prompts.

## Data and privacy

The server is read-only. It doesn't modify your application, HDS packages, or documentation.

Component, token, and icon data are read from local HDS packages. Documentation search uses a snapshot bundled with the server. Tool and resource requests don't make network requests or send your project data to an HDS service.

Documentation results include canonical `helios.hashicorp.design` URLs. An MCP client may choose to open or fetch those URLs independently, subject to the client's configuration and permissions.

Because the documentation is a bundled snapshot, it may differ from the live website after a new release. Each documentation response includes snapshot provenance and a canonical URL so you can verify time-sensitive guidance.

## Troubleshooting

### The server doesn't connect

- Confirm that your client configuration uses an absolute path to `packages/mcp/dist/index.js`.
- Confirm that Node.js 24.x is available to the process that starts your MCP client.
- Rebuild the server after pulling repository changes.
- Restart or reload your MCP client after changing its configuration.

### Tools or resources return catalog errors

Run `pnpm install` from the repository root, then rebuild the server. The server reads catalogs from the HDS workspace packages and reports an error when it can't resolve them.

### Inspect the server directly

Run the MCP Inspector from the repository root to view the registered tools and resources and call them interactively.

```bash
pnpm -F @hashicorp/design-system-mcp start:dev
```

For implementation details or to report an issue, visit the [HDS repository](https://github.com/hashicorp/design-system/tree/main/packages/mcp).
