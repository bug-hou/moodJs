import { ModJs } from "./modJs";
import { DateOptions } from "./type";

class Diff {
  private signal: Boolean
  private time: number
  private maxTime!: number
  constructor(m1: ModJs) {
    this.time = m1.time();
    if (this.time > 0) {
      this.signal = true
    } else {
      this.signal = false
    }
  }
  format(m2: ModJs, str: string, config: object) {
    const diff = this.time - m2.time();

  }
  config(config: DiffConfig) {
    this.maxTime = new ModJs(config).time();
    return this;
  }
}
interface DiffConfig {
  year?: number
  month?: number
  date?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

function calculatTime(timeStamp: number) {
  const maxTimes = [1000, 60, 60, 24, 30, 12]
  const result = [];

}
