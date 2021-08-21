

type MapFunc<T> = (val: T, index?: number, arr?: T[]) => string;

export const groupBy = <T>(
  arr: T[],
  fn: MapFunc<T> | keyof T
): Record<string | number | symbol, T[]> =>
  arr
    .map(typeof fn === "function" ? fn : (val: T) => String(val[fn]))
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {} as Record<string | number | symbol, T[]>);

