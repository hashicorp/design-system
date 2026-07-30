---
applyTo: "website/docs/**.md"
description: "Guidelines on writing markdown files"
---

# Markdown best practices

## Headings

- Nest heading level sequentially
- Use sentence case for headings

## Banners

Banners are rendered from the `Doc::Banner` component.

- Place banners directly below headers, not within textual blocks
- Banner titles should be specific, and provide clear actionable context
- Follow existing banners as closely as possible for similar content
- Banner types
  - Use informational banners for
    - Providing clarity or additional context
    - Highlighting subtle constraints or limitations
    - Explaining non-critical differences or nuances
    - Noting important considerations that improve implementation
  - Use insight banners for
    - Providing helpful tips
    - Sharing knowledge or learning opportunities
    - Linking to external resources
  - Use warning banners for
    - Calling out risks
    - Consumer responsibility
    - Deprecation notices
    - Alerting a consumer that something has gone wrong
  - Use critical banners for
    - Highest-level important information
    - Calling out things such as upcoming deprecations
  - Use callout banners for
    - Sharing information that's still useful but ultimately supplemental
    - Recommending a conversation with the HDS Team
    - When content needs to stand apart from the body copy, but doesn't require as much prominence as an informational banner

## Blockquote

Use blockquotes when quoting a resource or when distinguishing small amounts of information from the body content. If quoting a resource, include the name of the author and a link to the resource.

## Images

- Place images after the content they are related to
- Always set alternative text which describes the image in detail unless the text before or after the image explains what the image shows.
  - Alt text should only be left null if the image is decorative
  - Do: `![Architecture diagram of the splitting demo. A web service directly connects to two different versions of the API service through proxies. Consul configures those proxies.](/static/img/consul-splitting-architecture.png)`
  - Don't: `![Consul splitting architecture](/static/img/consul-splitting-architecture.png)`
  - Don't: `![](/static/img/consul-splitting-architecture.png)`
