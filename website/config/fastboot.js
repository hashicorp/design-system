/* eslint-disable no-redeclare */
/* global ReadableStream, WritableStream, TransformStream, Headers */
module.exports = function () {
  return {
    buildSandboxGlobals(defaultGlobals) {
      return Object.assign({}, defaultGlobals, {
        fetch: require('node-fetch'),
        AbortController,
        ReadableStream:
          typeof ReadableStream !== 'undefined'
            ? ReadableStream
            : require('node:stream/web').ReadableStream,
        WritableStream:
          typeof WritableStream !== 'undefined'
            ? WritableStream
            : require('node:stream/web').WritableStream,
        TransformStream:
          typeof TransformStream !== 'undefined'
            ? TransformStream
            : require('node:stream/web').TransformStream,
        Headers: typeof Headers !== 'undefined' ? Headers : undefined,
      });
    },
  };
};
