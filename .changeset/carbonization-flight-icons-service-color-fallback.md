---
"@hashicorp/flight-icons": minor
---

Added a monochrome Carbon-theme fallback for all the colored `Services` icons and some `Products` icons

The `Services` and `Products` icons have no IBM Carbon equivalent. Their `***-color` glyphs don't always work against dark backgrounds. So when the Carbon themes are activated, and their colored glyph is rendered, there are color contrast issues (eg. a dark icon on a dark background).

With this change they now fall back to their monochrome counterpart (eg. `aws-cloudwatch-color` to `aws-cloudwatch`, `hashicorp-color` to `hashicorp`), whose dynamic color is emitted as `currentColor` so it adapts to the current theme.

This is handled entirely in the build pipeline: the generated registry keeps its existing shape, so no changes are required in consuming applications.
