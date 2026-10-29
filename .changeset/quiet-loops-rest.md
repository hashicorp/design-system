---
"@hashicorp/design-system-components": patch
---

Replaced internal usage of `@ember/runloop` (`schedule`, `scheduleOnce`, `next`) with a shared deferral utility built on `renderSettled` and `@ember/test-waiters`. Affects `Tabs`, `Stepper`, `FilterBar`, `CodeBlock`, `DisclosurePrimitive`, `PopoverPrimitive`, `KeyValueInputs` and `AdvancedTable`.
