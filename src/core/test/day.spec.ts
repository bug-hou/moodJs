import { ModJs } from "../modJs";

describe("happy path", () => {
  const m1 = new ModJs(2022, 5, 10);
  it("dayToMonth", () => {
    expect(m1.dayToMonth()).toBe(10);
  });
  it("dayToYear", () => {
    expect(m1.dayToYear()).toBe(130);
  });
  it("dayToMonth", () => {
    expect(m1.dayToMonth()).toBe(10);
  });
  it("dayToMonth", () => {
    expect(m1.dayToMonth()).toBe(10);
  });
});
