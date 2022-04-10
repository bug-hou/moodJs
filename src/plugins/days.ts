import { months } from "../assets";
import { ModJs } from "../core";
import { isLeapYear } from "../utils";

export function dayInMonth(ModJs: ModJs) {
  const [year, month] = ModJs.get(["fullYear", "month"]);
  if (isLeapYear(year) && month === 2) {
    return 29;
  }
  return months[month - 1];
}

export function dayInYear(ModJs: ModJs) {
  const [year] = ModJs.get(["fullYear"]);
  if (isLeapYear(year)) {
    return 366;
  }
  return 365;
}

export function dayToMonth(ModJs: ModJs) {
  return ModJs.date();
}

export function dayToYear(ModJs: ModJs) {
  let result = 0;
  const [month, date] = ModJs.get(["month", "date"]);
  for (let i = 1; i < month; i++) {
    result += months[i - 1];
  }
  return result + date;
}
