export type DateMethod =
  | "month"
  | "date"
  | "hours"
  | "minutes"
  | "seconds"
  | "time"
  | "milliseconds"
  | "week"
  | "fullYear"
  | "dateInMonth"
  | "dateInYear"
  | "dateToMonth"
  | "dateToYear";

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
