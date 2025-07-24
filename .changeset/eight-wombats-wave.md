---
"@hashicorp/design-system-components": patch
---

Make `@ember/string` a peerDependency to allow consuming apps to choose to use `3.x` or `4.x`. This unblocks apps that need `4.x` for vite compatibility, while retaining `3.x` support as well for older apps.
