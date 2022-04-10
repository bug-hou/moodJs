import { ModJs } from "../modJs";

describe("extreme", () => {
  it("extreme", () => {
    const m1 = new ModJs(2022, 0, 1);
    const [month, date] = m1.get(["month", "date"]);
    expect(month).toBe(1);
    expect(date).toBe(1);
  });
});
