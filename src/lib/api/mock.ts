/** Simulates network latency for mocked service responses. */
export function mockDelay<T>(data: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
