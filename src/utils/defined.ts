export const isArray = (value): value is any[] => Array.isArray(value);

export const isString = (value): value is string => typeof value === "string";

export const isDate = (value): value is Date => value instanceof Date;

export const isNumber = (value): value is number =>
  typeof value === "number" && !isNaN(value);
