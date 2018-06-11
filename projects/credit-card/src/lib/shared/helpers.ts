export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v: number, k: number) => k + start).map((m: number) => m.toString());
