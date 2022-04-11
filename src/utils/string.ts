export const capitalize = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

export const numberSlice = (val: number | string, start?: number, end?: number) => {
  return String(val).slice(start, end);
};

export const numberPadStart = (val: number, len: number, s: string) => {
  return String(val).padStart(len, s);
};

export const toString = (val: number) => {
  return String(val);
};
