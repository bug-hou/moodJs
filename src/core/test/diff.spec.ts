import { Diff } from "../difference";
import { ModJs } from "../modJs";

describe("diff methods", () => {
  const m1 = new ModJs("2022-4-17 19:20:50");
  test("default", () => {
    const d = new Diff(m1);
    expect(d.format("2022-4-17 20:10:50")).toBe("50分钟前");
  });
  test("exact", () => {
    const d = new Diff(m1);
    d.processConfig({ exact: true, exactValue: "seconds" });
    expect(d.format("2022-4-17 20:10:40")).toBe("49分钟50秒前");
  });
  test("min", () => {
    const d = new Diff(m1);
    d.processConfig({ exact: true, exactValue: "seconds" });
    expect(d.format("2022-10-17 20:10:40")).toBe("2022-10-17 08-10-40");
  });
  test("max", () => {
    const d = new Diff(m1);
    d.processConfig({
      exact: true,
      exactValue: "seconds",
      maxTimeStamp: "infinity"
    });
    // 还是要安装月份来进行计算
    expect(d.format("2022-10-17 20:10:40")).toBe("6月份3天49分钟50秒前");
  });
});
