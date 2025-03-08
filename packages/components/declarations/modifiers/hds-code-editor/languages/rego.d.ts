/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { StringStream } from '@codemirror/language';
interface ParserConfig {
    delimiters?: RegExp;
    operators?: RegExp;
}
interface RegoState {
    tokenize: (stream: StringStream, state: RegoState) => string | null;
}
export declare function mkRego(parserConf?: ParserConfig): {
    name: string;
    startState: () => RegoState;
    token: (stream: StringStream, state: RegoState) => string | null;
    languageData: {
        commentTokens: {
            line: string;
            block: {
                open: string;
                close: string;
            };
        };
        closeBrackets: {
            brackets: string[];
        };
    };
};
export declare const rego: {
    name: string;
    startState: () => RegoState;
    token: (stream: StringStream, state: RegoState) => string | null;
    languageData: {
        commentTokens: {
            line: string;
            block: {
                open: string;
                close: string;
            };
        };
        closeBrackets: {
            brackets: string[];
        };
    };
};
export {};
//# sourceMappingURL=rego.d.ts.map