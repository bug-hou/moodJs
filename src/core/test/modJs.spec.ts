import { ModJs } from "../modJs";

describe("happy path", () => {
  const date = new Date();
  const date1 = new ModJs();
  const date2 = new ModJs("2022-4-7");
  const date3 = new ModJs(date);
  const date4 = new ModJs(2022, 4, 7);
  const date5 = new ModJs("December 17, 2022 03:24:00");
  const date6 = new ModJs("2021-12-17T03:24:00");
  const date7 = new ModJs({
    year: 2022,
    month: 4,
    date: 10
  });
  it("option", () => {
    const date8 = new ModJs({
      year: 2022,
      month: -4,
      date: 10
    });
    expect(date8.year()).toBe(2021);
    expect(date8.month()).toBe(8);
    expect(date8.dayInMonth()).toBe(31);
  });
  it("month", () => {
    expect(date1.month()).toBe(date.getMonth() + 1);
    expect(date2.month()).toBe(4);
    expect(date3.month()).toBe(date.getMonth() + 1);
    expect(date4.month()).toBe(4);
    expect(date5.month()).toBe(12);
    expect(date6.month()).toBe(12);
    expect(date7.month()).toBe(4);
  });
  it("create a date", () => {
    /*
      会报错
      new ModJs("dfsajdklfj");
    */
    expect(date1.date()).toBe(date.getDate());
    expect(date2.date()).toBe(7);
    expect(date3.date()).toBe(date.getDate());
    expect(date4.date()).toBe(7);
    expect(date5.date()).toBe(17);
    expect(date6.date()).toBe(17);
    expect(date7.date()).toBe(10);
  });
  it("all methods", () => {
    expect(date1.year(2023).year()).toBe(2023);
    expect(date1.month(12).month()).toBe(12);
    expect(date1.date(20).date()).toBe(20);
    expect(date1.hours(14).hours()).toBe(14);
    expect(date1.minutes(50).minutes()).toBe(50);
    expect(date1.seconds(50).seconds()).toBe(50);
    expect(date1.milliseconds(185).milliseconds()).toBe(185);
  });
  it("get or set value", () => {
    const d = date1
      .set({ year: 2022, month: 10, date: 10 })
      .get(["fullYear", "month", "date"]);
    expect(date1.get("date")).toBe(10);
    expect(d[0]).toBe(2022);
    expect(d[1]).toBe(10);
    expect(d[2]).toBe(10);
  });
  it("modJs format", () => {
    expect(date2.format("YYYY-MM-DD")).toBe("2022-04-07");
    date2.set({
      hours: 12,
      minutes: 50,
      seconds: 6,
      milliseconds: 615
    });
    expect(date2.format("YYYY-MM-DD [AM] hh:mm:ss:SSS")).toBe(
      "2022-04-07 AM 12:50:06:615"
    );
  });
});
