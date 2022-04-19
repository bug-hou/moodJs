import { ModJs } from "./core";
import { NowToDate } from "./core/date";
import { DateOptions } from "./core/type";
import { isUndefined } from "./utils";

function modJs(): ModJs;
function modJs(option: number): ModJs;
function modJs(option: string): ModJs;
function modJs(option: Date): ModJs;
function modJs(options: DateOptions): ModJs;
function modJs(
  option: number,
  month: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
): ModJs;
function modJs(
  option?: any,
  month?: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
): ModJs {
  if (option) {
    return new ModJs(option);
  }
  if (month) {
    return new ModJs(option, month, day, hours, minutes, milliseconds);
  }
  return new ModJs();
}

modJs.prototype.use = ModJs.use;

export default modJs;

export { modJs };
