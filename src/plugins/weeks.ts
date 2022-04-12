import { dayInMonth } from ".";
import { ModJs } from "../core";
import { dayInYear, dayToYear } from "./days";

export function weekInMonth(modJs: ModJs) {
  const [month, year] = modJs.get(["month", "fullYear"]);
  const week = modJs.create({ year, month: month, date: 1 }).get("week");
  const dates = dayInMonth(modJs)
  return calculaterWeek(dates, week)
}

export function weekToMonth(modJs: ModJs) {
  const [dates, week] = modJs.get(["date", "week"])
  return calculaterWeek(dates, week, true)
}

export function weekInYear(modJs: ModJs) {
  const [year] = modJs.get(["fullYear"]);
  const [week] = modJs.create({ year, month: 1, date: 1 }).get(["week"])
  const dates = dayInYear(modJs);
  return calculaterWeek(dates, week);
}

export function weekToYear(modJs: ModJs) {
  const [week] = modJs.get(["week"])
  const dates = dayToYear(modJs)
  return calculaterWeek(dates, week, true);
}

const calculaterWeek = (dates: number, week: number, isTo = false) => {
  if (isTo) {
    return Math.ceil((dates - week) / 7)
  }
  if (week === 0) {
    return Math.ceil(dates / 7)
  }
  return Math.ceil(((dates - (8 - week)) / 7))
}
