import { ModJs } from "../modJs";

describe("happy path", () => {
  const date = new Date();
  const date1 = new ModJs();
  const date2 = new ModJs("2022-4-7");
  const date3 = new ModJs(date);
  const date4 = new ModJs(2022, 4, 7);
  it("create a date", () => {
    /*
      会报错
      new ModJs("dfsajdklfj");
    */
    expect(date1.date()).toBe(date.getDate());
    expect(date2.date()).toBe(7);
    expect(date3.date()).toBe(date.getDate());
    expect(date4.date()).toBe(7);
  });
  it("get or set value", () => {
    expect(date1.date(1).date()).toBe(1)
    expect(date1.year(2023).year()).toBe(2023);
    const d = date1.set({ year: 2022, month: 10, date: 10 }).get(["fullYear", "month", "date"]);
    expect(d[0]).toBe(2022)
    expect(d[1]).toBe(11)
    expect(d[2]).toBe(10)
  });
  it("modJs format", () => {
    expect(date2.format("YYYY-MM-DD")).toBe("2022-04-07")
  })
});
