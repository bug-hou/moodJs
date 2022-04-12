import { ModJs } from "../../core/index";
import { dayToMonth, dayInMonth, dayInYear, dayToYear } from "../days";

describe("happy path", () => {
  const m1 = new ModJs(2022, 5, 10);
  it("dayToMonth", () => {
    expect(dayToMonth(m1)).toBe(10);
  });
  it("dayToYear", () => {
    expect(dayToYear(m1)).toBe(130);
  });
  it("dayToMonth", () => {
    expect(dayToMonth(m1)).toBe(10);
  });
  it("dayToMonth", () => {
    expect(dayToMonth(m1)).toBe(10);
  });
});
