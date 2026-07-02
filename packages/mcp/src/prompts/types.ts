import type { ZodRawShapeCompat } from "./args.ts";

export type PromptTextMessage = {
  role: "user" | "assistant";
  content: {
    type: "text";
    text: string;
  };
};

export type PromptResourceLinkMessage = {
  role: "user" | "assistant";
  content: {
    type: "resource_link";
    uri: string;
    name: string;
    description?: string;
    mimeType?: string;
  };
};

export interface McpPrompt<Args extends PromptArgsRawShape> {
  id: string;
  name: string;
  description?: string;
  messages: PromptMessage[];
}
