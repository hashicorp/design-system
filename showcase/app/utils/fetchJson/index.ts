/**
 * Fetches JSON from a URL and returns the parsed result, typed as T.
 * Throws if the fetch fails or the response is not ok.
 */
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response.json() as Promise<T>;
}
