export default class NoBareStringsInAttributes {
    visitor(): {
        ElementNode(node: any): void;
    };
}
