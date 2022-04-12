import {
  capitalize,
  formatRules,
  isDate,
  isNumber,
  isObject,
  isString,
  isUndefined,
  mergeWith,
  numberPadStart,
  numberSlice,
  toString
} from "../utils";
import { DateMethod, DateOptions, languageModule, ModJsLanguage, ModJsOptions } from "./type";
import { DateToDate, NowToDate, numberToDate } from "./date";
import language from "../assets/language"

export class ModJs {
  private $Date: Date;
  private $year!: number;
  private $month!: number;
  private $date!: number;
  private $week!: number;
  private $hours!: number;
  private $minutes!: number;
  private $seconds!: number;
  private $milliseconds!: number;
  private $time!: number;
  private language: ModJsLanguage = "en"
  private $local: languageModule
  constructor();
  constructor(dateString: string);
  constructor(date: Date);
  constructor(timmer: number);
  constructor(options: DateOptions);
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
    option?: number | Date | string | DateOptions,
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
    if (isUndefined(option)) {
      this.$Date = NowToDate();
    } else if (isString(option)) {
      const timeStamp = this.parse(option);
      // 判断转化是否出错
      if (isNumber(timeStamp)) {
        this.$Date = numberToDate(timeStamp);
      } else {
        throw new TypeError("当前格式不能转化为日期格式");
      }
    } else if (isDate(option)) {
      // 判断如果为date类型直接转化
      this.$Date = DateToDate(option);
    } else {
      if (isObject(option)) {
        let { year, month, date, hours, minutes, seconds, milliseconds } =
          option as DateOptions;
        this.$Date = numberToDate(
          year ?? 1970,
          month,
          date,
          hours,
          minutes,
          seconds,
          milliseconds
        );
      } else {
        this.$Date = numberToDate(
          option,
          monthIndex,
          day,
          hours,
          minutes,
          seconds,
          milliseconds
        );
      }
    }
    this.$local = language[this.language];
    this.init();
    // this.indicator = this.create();
  }
  private init() {
    const { $Date: D } = this;
    this.$year = D.getFullYear();
    this.$month = D.getMonth() + 1;
    this.$date = D.getDate();
    this.$week = D.getDay();
    this.$hours = D.getHours();
    this.$minutes = D.getMinutes();
    this.$seconds = D.getSeconds();
    this.$milliseconds = D.getMilliseconds();
    this.$time = D.getTime();
  }
  create(options: DateOptions = {}) {
    const [year, month, date, hours, minutes, seconds, milliseconds] = this.get(
      [
        "fullYear",
        "month",
        "date",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
      ]
    );
    const defaultOption = {
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      milliseconds
    };
    return new ModJs(mergeWith(options, defaultOption));
  }
  format(str: string = "YYYY-MM-DD HH-mm-ss") {
    const {
      $year,
      $month,
      $date,
      $week,
      $hours,
      $minutes,
      $seconds,
      $milliseconds,
      $time,
      $local
    } = this;
    const matches = {
      YY: numberSlice($year, -2),
      YYY: numberSlice($year, -3),
      YYYY: toString($year),
      M: toString($month + 1),
      MM: numberPadStart($month, 2, "0"),
      MMM: numberSlice($local["months"][$month - 1], 0, 3),
      MMMM: $local['months'][$month - 1],
      D: toString($date),
      DD: numberPadStart($date, 2, "0"),
      w: toString($week),
      H: toString($hours),
      HH: numberPadStart($hours, 2, "0"),
      h: numberPadStart($hours % 12 || 12, 1, "0"),
      hh: numberPadStart($hours % 12 || 12, 2, "0"),
      m: toString($minutes),
      mm: numberPadStart($minutes, 2, "0"),
      s: toString($seconds),
      ss: numberPadStart($seconds, 2, "0"),
      S: toString($milliseconds),
      SSS: numberPadStart($milliseconds, 3, "0"),
      t: toString($time)
    };
    return str.replace(formatRules, (match, str) => str || matches[match]);
  }
  set(options: DateOptions): ModJs;
  set(name: DateMethod, val: number): ModJs;
  set(options: DateOptions | DateMethod, val?: number) {
    if (isString(options)) {
      options = { [options]: val };
    }
    for (const key in options) {
      this.processDate(key as any, options[key], false);
    }
    this.init();
    return this;
  }
  get(name: DateMethod): number;
  get(options: ModJsOptions): number[];
  get(options: ModJsOptions | DateMethod) {
    if (isString(options)) {
      return this[options]();
    }
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
  time(): number;
  time(val: number): ModJs;
  time(val?: number) {
    return this.processDate("time", val);
  }
  isBefore(m: ModJs) {
    return !!(this.time() > m.time());
  }
  isAfter(m: ModJs) {
    return !!(this.time() < m.time());
  }
  week() {
    return this.$week;
  }
  parse = Date.parse;
  private processDate(
    name: DateMethod,
    val?: number,
    isRefresh: boolean = true
  ): ModJs | number {
    let capName = capitalize(name);
    if (val) {
      if (name === "month") {
        // 因为在init时，month会+1
        val -= 1;
      }
      this.$Date["set" + capName](val);
      // 可以阻止刷新
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
  static use(module: Function, options) {
    module.call(ModJs, options)
  }
}

