---
"@hashicorp/design-system-components": patch
---

Replaced internal usage of `@ember/runloop` (`schedule`, `scheduleOnce`, `next`) with a shared, destroy-aware and test-waiter-aware deferral utility
