import type { JsonObject } from "./types.js";

export const serializeCaughtError = (error: unknown): JsonObject => {
  if (error instanceof Error) {
    const serializedError: JsonObject = {
      name: error.name,
      message: error.message,
    };

    if (typeof error.stack === "string") {
      serializedError.stack = error.stack;
    }

    return serializedError;
  }

  if (typeof error === "string") {
    return { message: error };
  }

  if (typeof error === "number" || typeof error === "boolean") {
    return { message: String(error) };
  }

  if (typeof error === "bigint") {
    return { message: error.toString(), type: "bigint" };
  }

  return { message: "Unknown error" };
};
