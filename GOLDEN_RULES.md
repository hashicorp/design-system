# Golden Rules for Development Using Helios

1. **Use Helios first.** Prefer existing Helios components, layouts, tokens, and icons over custom implementations.

2. **Use only documented public APIs.** Do not depend on internal components, Sass files, mixins, CSS properties, or utilities.

3. **Prefer the highest-level component that fits.** Use complete, accessible components before base elements or primitives; custom composition transfers accessibility responsibility to you.

4. **Choose components by behavior and semantics, not appearance.** Use links for navigation, buttons for actions, and tables only for tabular data.

5. **Use documented composition patterns.** Prefer yielded components and named blocks over invoking internal subcomponents directly.

6. **Treat accessibility as an application responsibility.** Helios components help, but their composition must still be keyboard accessible, screen-reader usable, and WCAG 2.2 AA conformant.

7. **Prefer native HTML semantics over ARIA.** Add ARIA only when valid and necessary; no ARIA is better than incorrect ARIA.

8. **Preserve document structure.** Use landmarks, meaningful page titles, associated labels, and logical heading levels without skipping levels.

9. **Keep DOM, reading, visual, and focus order aligned.** Do not visually reverse or rearrange content in ways that conflict with keyboard navigation.

10. **Manage focus intentionally.** Trap focus in modal interfaces, restore it when they close, and provide keyboard equivalents for every mouse interaction.

11. **Use semantic tokens instead of raw values.** Prefer documented color, spacing, typography, and layout tokens; validate contrast whenever using an escape hatch.

12. **Use Helios layout and responsive foundations.** Prefer App Frame, Flex, Grid, standard gaps, and mobile-first Helios breakpoints before writing bespoke layout CSS.

13. **Use supported Flight icons through Helios.** Treat icons as supporting presentation, not the sole communication of meaning; icon-only controls need accessible names.

14. **Build forms with complete Helios field components.** Every input needs a persistent visible label; placeholders are not labels.

15. **Make errors clear and recoverable.** Explain what went wrong and how to fix it, place feedback near its source, and reserve form-level alerts for submission-wide errors.

16. **Avoid disabled controls when guidance is needed.** Prefer omission, enabled validation, read-only presentation, or contextual explanation with a path forward.

17. **Communicate system state.** Make loading, processing, success, empty, and failure states clear, contextual, and actionable.

18. **Write concise, action-oriented interface copy.** Use sentence case, active voice, plain language, and explicit verb-noun labels such as “Delete project.”

19. **Do not introduce deprecated or unsupported patterns.** Check current documentation and version history; when Helios cannot meet a validated requirement, consult the Design Systems team rather than silently overriding it.
