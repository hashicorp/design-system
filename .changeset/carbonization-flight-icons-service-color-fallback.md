---
"@hashicorp/flight-icons": minor
---

Added a monochrome Carbon-theme fallback for the colored `Services` icons

The colored service icons (eg. `aws-cloudwatch-color`) have no IBM Carbon equivalent, so until now they had no Carbon entry in the icons registry and kept rendering their colored glyph in Carbon themes, where they don't always work against dark backgrounds. They now fall back to their monochrome counterpart (eg. `aws-cloudwatch`), whose dynamic color is emitted as `currentColor` so it adapts to the current theme.

This is handled entirely in the build pipeline: the generated registry keeps its existing shape, so no changes are required in consuming applications.
