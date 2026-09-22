The Helios Design System (HDS) MCP server gives AI assistants structured access to our component APIs, documentation, design tokens, and Flight icons. It helps an assistant find HDS resources and apply our guidance while you design, build, or review an application.

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

[[code-snippets/build-server]]

### Connect an MCP client

!!! Information

**Check your client's configuration format**

MCP clients use different configuration files and may use a different property name for local servers. Check your client's documentation for where to add the configuration and whether you need to adapt the format below.

!!!

Add the following server definition to your MCP client configuration. Replace `/absolute/path/to/design-system` with the absolute path to your local checkout.

[[code-snippets/server-config]]

Restart or reload your MCP client after updating its configuration.

### Verify the connection

Ask your client a question that requires HDS information, for example:

> Find the HDS component for an advanced data table and show me its exact invocation name.

Your client should call `search_hds_components` and return one or more matching components. If your client displays connected servers or tools, look for the server you configured as `helios-design-system` and the tools listed below.

## Available tools

Your assistant uses these tools to find HDS information in response to your requests. All tools are read-only and use local catalogs or bundled documentation.

| Tool | Purpose |
|------|---------|
| `search_hds_components` | Finds components and confirms their exact names. |
| `get_hds_component` | Retrieves a component's API, including arguments, accepted values, blocks, and yielded components. |
| `search_hds_docs` | Finds usage, accessibility, and other guidance in the bundled HDS documentation. |
| `read_hds_docs` | Reads a complete documentation passage, including guidance and code examples. |
| `search_hds_icons` | Finds Flight icons and their available sizes by name or keyword. |
| `search_hds_tokens` | Finds design tokens, their values, and CSS variable names. |

## Prompt guidance and examples

Tell your assistant what you want to accomplish and include relevant context, such as the component name, framework, documentation area, or code you want reviewed. Specific requests help your assistant find relevant HDS guidance.

For more specific results, you can ask your assistant to find a component and consult its documentation before suggesting an implementation. For example:

> Find the HDS Button component, search its documentation for full-width usage, then read the guidance and code examples before showing me how to add it to my Ember template.

### Example prompts

- "Which HDS component should I use for a confirmation dialog?"
- "How do I add sorting to an HDS Advanced Table?"
- "Review this template against the HDS Button accessibility guidance."
- "Find the design token for the primary interactive color."
- "Find the Flight icon for copying content and list its available sizes."
- "What changed in the latest version of the HDS Modal?"

## Data and privacy

The server is read-only. It doesn't modify your application, HDS packages, or documentation.

- Component, token, and icon data are read from local HDS packages.
- Documentation search uses a snapshot bundled with the server.
- Tool and resource requests don't make network requests or send your project data to an HDS service.

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

[[code-snippets/inspect-server]]

For implementation details, visit the [HDS repository](https://github.com/hashicorp/design-system/tree/main/packages/mcp). To get support or report an issue, visit the [support](/about/support) page.
