export const range = (start: number, end: number): Array<number> =>
  start != null && end != null ? Array.from({ length: end - start + 1 }, (v: number, k: number) => k + start) : null;

export const stringify = <T>(array: Array<T>): Array<string> =>
  array != null ? array.map((n: T) => n.toString()) : null;
