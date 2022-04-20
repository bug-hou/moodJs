import { isModJs, isString } from "../utils";
import { ModJs } from "./modJs";
import { DateOptions, TimeUntis } from "./type";
import { diffLanguage as local } from "../assets/language";

const TimeNames = ["seconds", "minutes", "hours", "date", "month", "year"];

export class Diff {
  private time: number;
  // 默认为一个月
  private maxTime: number = 1000 * 60 * 60 * 24 * 30;
  private config: DiffConfig = {};
  constructor(m1: ModJs) {
    this.time = m1.time();
  }
  format(m2: ModJs | DateOptions | Date | string | number, str: string = "前") {
    if (!isModJs(m2)) {
      m2 = new ModJs(m2 as any);
    }
    const names = [
      "seconds",
      "minutes",
      "hours",
      "date",
      "month",
      "year"
    ].reverse();
    let diffTime = Math.abs(this.time - m2.time());
    if (this.maxTime < diffTime) {
      return m2.format("YYYY-MM-DD hh-mm-ss");
    }
    // return diffTime;
    const date = this.calculator(diffTime);
    if (this.config.exact) {
      let result = "";
      for (const key of names) {
        if (date[key]) {
          result += date[key] + local.zn[key];
        }
      }
      return result + str;
    } else {
      return date.endValue + local.zn[date.endName] + str;
    }
  }
  /*
    这里有一个时间戳
    将时间戳改变为
    13分钟前
    1小时前
    exact
    1小时13分钟前
  */
  private calculator(timeStamp: number) {
    const date = { endValue: 0, endName: "milliseconds" };
    const names = TimeNames;
    const times = [1000, 60, 60, 24, 30, 12];
    if (this.config.exact) {
      const minIndex = names.indexOf(this.config.exactValue ?? "minutes");
      times.forEach((item, index) => {
        const value =
          Math.floor(timeStamp / item) %
          (times[index + 1] ?? Number.MAX_SAFE_INTEGER);
        if (value > 0 && index >= minIndex) {
          date[names[index]] = value;
        }
        timeStamp /= item;
      });
    } else {
      times.forEach((item, index) => {
        const value =
          Math.floor(timeStamp / item) %
          (times[index + 1] ?? Number.MAX_SAFE_INTEGER);
        if (value > 0) {
          date[names[index]] = value;
          date.endValue = value;
          date.endName = names[index];
        }
        timeStamp /= item;
      });
    }
    return date;
  }
  processConfig(config: DiffConfig) {
    this.config = config;
    if (config.maxTimeStamp) {
      this.maxTime = isString(config.maxTimeStamp)
        ? Number.MAX_SAFE_INTEGER
        : config.maxTimeStamp;
    } else {
      if (config.customTime) {
        this.maxTime = new ModJs(config.customTime).time();
      }
    }
  }
}
interface DiffConfig {
  maxTimeStamp?: number | "infinity";
  customTime?: DateOptions;
  isUseWeek?: boolean;
  isUseSeason?: boolean;
  exact?: boolean;
  exactValue?: TimeUntis;
}
