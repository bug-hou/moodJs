import { ModJs } from "../core";

export function weekInMonth(modJs: ModJs) {
  const [month, year] = modJs.get(["month", "fullYear"]);
  const [dates, week] = modJs.create({ year, month: month, date: 1 }).get(["dateInMonth", "week"])
  return calculaterWeek(dates, week)
}

export function weekToMonth(modJs: ModJs) {
  const [dates, week] = modJs.get(["dateInMonth", "week"])
  return Math.ceil((dates - week) / 7)
}

export function weekInYear(modJs: ModJs) {
  const [year] = modJs.get(["fullYear"]);
  const [dates, week] = modJs.create({ year, month: 1, date: 1 }).get(["dateInYear", "week"])
  return calculaterWeek(dates, week);
}

export function weekToYear(modJs: ModJs) {
  const [week, dates] = modJs.get(["week", "dateToYear"])
  return Math.ceil((dates - week) / 7)
}

const calculaterWeek = (dates: number, week: number) => Math.ceil((dates - (8 - (week === 0 ? 7 : week)) === 7 ? 0 : (8 - (week === 0 ? 7 : week))) / 7)
