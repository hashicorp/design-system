import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "helios-design-system-mcp",
  version: "0.0.0",
});

const main = async (): Promise<void> => {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("Helios MCP server running on stdio");
};

void main().catch((error: unknown) => {
  console.error("Fatal error in MCP server:", error);

  process.exit(1);
});
