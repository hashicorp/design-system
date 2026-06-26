import type {
  ResourceMetadata,
  ResourceTemplate,
  ReadResourceCallback,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";

export interface BaseMcpResource {
  name: string;
  config: ResourceMetadata;
}

export type StaticMcpResource = BaseMcpResource & {
  uri: string;
  readCallback: ReadResourceCallback;
};

export type DynamicMcpResource = BaseMcpResource & {
  template: ResourceTemplate;
  readCallback: ReadResourceTemplateCallback;
};

export type McpResource = StaticMcpResource | DynamicMcpResource;
