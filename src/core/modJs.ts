import {
  capitalize,
  isDate,
  isNumber,
  isString,
  numberPadStart,
  numberSlice,
  toString
} from "../utils";
import { DateMethod, DateOptions, ModJsOptions } from "./type";

export class ModJs {
  private $Date: Date;
  private $year!: number;
  private $month!: number;
  private $date!: number;
  private $day!: number;
  private $hours!: number;
  private $minutes!: number;
  private $seconds!: number;
  private $milliseconds!: number;
  private $time!: number;
  constructor();
  constructor(dateString: string);
  constructor(date: Date);
  constructor(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  );
  constructor(
    year?: number | Date | string,
    monthIndex?: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ) {
    /*
      由于浏览器之间的差异与不一致性，强烈不推荐使用Date构造函数来解析日期字符串 (或使用与其等价的Date.parse)。
      对 RFC 2822 格式的日期仅有约定俗成的支持。
      对 ISO 8601 格式的支持中，仅有日期的串 (例如 "1970-01-01") 会被处理为 UTC 而不是本地时间，与其他格式的串的处理不同。
      */
    if (isString(year)) {
      const timeStamp = Date.parse(year);
      // 判断转化是否出错
      if (isNumber(timeStamp)) {
        this.$Date = new Date(timeStamp);
      } else {
        throw new TypeError("当前格式不能转化为日期格式");
      }
    } else if (isDate(year)) {
      // 判断如果为date类型直接转化
      this.$Date = new Date(year);
    } else if (isNumber(year)) {
      // 全是数字类型
      this.$Date = new Date(
        year,
        monthIndex ?? 0,
        day ?? 0,
        hours ?? 0,
        minutes ?? 0,
        seconds ?? 0,
        milliseconds ?? 0
      );
    } else {
      // 没有参数时
      this.$Date = new Date();
    }
    this.init();
  }
  private init() {
    const { $Date: D } = this;
    this.$year = D.getFullYear();
    this.$month = D.getMonth() + 1;
    this.$date = D.getDate();
    this.$day = D.getDay();
    this.$hours = D.getHours();
    this.$minutes = D.getMinutes();
    this.$seconds = D.getSeconds();
    this.$milliseconds = D.getMilliseconds();
    this.$time = D.getTime();
  }
  format(str: string) {
    const {
      $year,
      $month,
      $date,
      $day,
      $hours,
      $minutes,
      $seconds,
      $milliseconds,
      $time
    } = this;
    const matches = {
      YY: numberSlice($year, -2),
      YYY: numberSlice($year, -3),
      YYYY: toString($year),
      M: toString($month + 1),
      MM: numberPadStart($month, 2, "0"),
      D: toString($date),
      DD: numberPadStart($date, 2, "0"),
      d: toString($day),
      H: toString($hours),
      HH: numberPadStart($hours, 2, "0"),
      h: numberPadStart($hours % 12 || 12, 1, "0"),
      hh: numberPadStart($hours, 2, "0"),
      m: toString($minutes),
      mm: numberPadStart($minutes, 2, "0"),
      s: toString($seconds),
      ss: numberPadStart($seconds, 2, "0"),
      S: toString($milliseconds),
      SSS: numberPadStart($milliseconds, 3, "0")
    };
    return str.replace(
      /\[([^\]]+)]|Y{1,4}|M{1,2}|D{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|w{1}/g,
      (match) => matches[match]
    );
  }
  set(options: DateOptions) {
    for (const key in options) {
      this.processDate(key as any, options[key], false);
    }
    this.init();
    return this;
  }
  get(options: ModJsOptions) {
    const result: any[] = [];
    options.forEach((item) => {
      if (item === "fullYear") {
        result.push(this["$year"]);
      } else {
        result.push(this["$" + item]);
      }
    });
    return result;
  }
  year(): number;
  year(val: number): ModJs;
  year(val?: number): ModJs | number {
    return this.processDate("fullYear", val);
  }
  month(): number;
  month(val: number): ModJs;
  month(val?: number) {
    return this.processDate("month", val);
  }
  date(): number;
  date(val: number): ModJs;
  date(val?: number) {
    return this.processDate("date", val);
  }
  hours(): number;
  hours(val: number): ModJs;
  hours(val?: number) {
    return this.processDate("hours", val);
  }
  minutes(): number;
  minutes(val: number): ModJs;
  minutes(val?: number) {
    return this.processDate("minutes", val);
  }
  seconds(): number;
  seconds(val: number): ModJs;
  seconds(val?: number) {
    return this.processDate("seconds", val);
  }
  milliseconds(): number;
  milliseconds(val: number): ModJs;
  milliseconds(val?: number) {
    return this.processDate("milliseconds", val);
  }
  day() {
    return this.$day;
  }
  private processDate(
    name: DateMethod,
    val?: number,
    isRefresh: boolean = true
  ): ModJs | number {
    let capName = capitalize(name);
    if (val) {
      this.$Date["set" + capName](val);
      if (isRefresh) {
        this.init();
      }
      return this;
    }
    if (name === "fullYear") {
      return this.$year;
    }
    return this["$" + name];
  }
}
