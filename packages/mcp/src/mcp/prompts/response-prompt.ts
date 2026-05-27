/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export type PromptTextMessage = {
  role: 'user' | 'assistant';
  content: {
    type: 'text';
    text: string;
  };
};

export type PromptResourceLinkMessage = {
  role: 'user' | 'assistant';
  content: {
    type: 'resource_link';
    uri: string;
    name: string;
    description?: string;
    mimeType?: string;
  };
};

export type PromptMessage = PromptTextMessage | PromptResourceLinkMessage;

export const toUserText = (text: string): PromptTextMessage => {
  return {
    role: 'user',
    content: {
      type: 'text',
      text,
    },
  };
};

export const toUserResourceLink = (input: {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}): PromptResourceLinkMessage => {
  return {
    role: 'user',
    content: {
      type: 'resource_link',
      uri: input.uri,
      name: input.name,
      ...(input.description === undefined
        ? {}
        : { description: input.description }),
      ...(input.mimeType === undefined ? {} : { mimeType: input.mimeType }),
    },
  };
};

export const toPromptResponse = (messages: PromptMessage[]) => {
  return {
    messages,
  };
};
