export type DateMethod =
  | "month"
  | "date"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds"
  | "fullYear";

export interface DateOptions {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export type ModJsOptions = DateMethod[];
