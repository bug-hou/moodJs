import { isDate, isNumber, isString } from "../utils";

export class ModJs {
  private _date: Date;
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
        this._date = new Date();
      } else {
        throw new TypeError("当前格式不能转化为日期格式");
      }
    } else if (isDate(year)) {
      // 判断如果为date类型直接转化
      this._date = new Date(year);
    } else if (isNumber(year)) {
      // 全是数字类型
      this._date = new Date(
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
      this._date = new Date();
    }
  }
  // 提供一个接口获取date
  get date() {
    return this._date;
  }
}
