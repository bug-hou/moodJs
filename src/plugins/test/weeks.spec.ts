import { ModJs } from "../../core"
import { weekInMonth, weekToMonth } from ".."

describe('plugins', () => {
  describe('week', () => {
    const m = new ModJs({
      year: 2022,
      month: 4,
      date: 11
    })
    it("expect", () => {
      expect(weekInMonth(m)).toBe(4);
      expect(weekToMonth(m)).toBe(2);
    })
  })
})
