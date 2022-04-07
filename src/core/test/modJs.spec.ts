import { ModJs } from "../modJs";

describe("happy path", () => {
  it("create a date", () => {
    const date = new Date();
    const date1 = new ModJs();
    const date2 = new ModJs("2022-4-7");
    const date3 = new ModJs(date);
    const date4 = new ModJs(2022, 4, 7);
    /*
      会报错
      new ModJs("dfsajdklfj");
    */
    expect(date1.date.getDate()).toBe(date.getDate());
    expect(date2.date.getDate()).toBe(7);
    expect(date3.date.getDate()).toBe(date.getDate());
    expect(date4.date.getDate()).toBe(7);
  });
});
