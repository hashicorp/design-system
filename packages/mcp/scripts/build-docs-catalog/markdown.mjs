/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the lexical shapes of markdown that more than one stage has to recognize

// opens or closes a fence
export const CODE_FENCE = /^[ \t]*(```|~~~)/;
export const ATX_HEADING = /^(#{1,6})[ \t]*(.+?)[ \t]*#*$/;

// a whole fenced block, info string included, so lifting one takes its label with it
export const FENCED_CODE =
  /^[ \t]*(?:```|~~~)[^\n]*\n([\s\S]*?)^[ \t]*(?:```|~~~)[ \t]*$/gm;
