/**
 * Copyright IBM Corp. 2020, 2026
 */

// @ts-expect-error: no types and we do not care about the types for this module, we just want to make sure it is loaded and available globally.
import Prism from 'prismjs';

// HDS currently expects Prism to be available as a global.
(globalThis as { Prism?: unknown }).Prism ??= Prism;
