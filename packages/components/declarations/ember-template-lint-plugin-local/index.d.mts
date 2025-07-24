declare namespace _default {
    let name: string;
    let rules: {
        'no-bare-strings-in-attributes': typeof NoBareStringsInAttributes;
    };
}
export default _default;
import NoBareStringsInAttributes from './rules/no-bare-strings-in-attributes.mjs';
