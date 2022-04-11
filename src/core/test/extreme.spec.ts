import { ModJs } from "../modJs";

describe("extreme", () => {
  it("extreme", () => {
    const m1 = new ModJs(2022, 0, 1);
    const m2 = new ModJs(2022, 1, 0);
    const [month, date] = m1.get(["month", "date"]);
    expect(month).toBe(1);
    expect(date).toBe(1);
    const [month2, date2] = m2.get(["month", "date"]);
    expect(month2).toBe(12);
    expect(date2).toBe(31);
  });
});
