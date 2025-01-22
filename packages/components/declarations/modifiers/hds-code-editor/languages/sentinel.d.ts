import type { StringStream } from '@codemirror/language';
interface ParserConfig {
    delimiters?: RegExp;
    operators?: RegExp;
}
interface SentinelState {
    tokenize: (stream: StringStream, state: SentinelState) => string | null;
}
export declare function mkSentinel(parserConf: ParserConfig): {
    name: string;
    startState: () => SentinelState;
    token: (stream: StringStream, state: SentinelState) => string | null;
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
export declare const sentinel: {
    name: string;
    startState: () => SentinelState;
    token: (stream: StringStream, state: SentinelState) => string | null;
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
//# sourceMappingURL=sentinel.d.ts.map