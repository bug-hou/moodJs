import { isModJs } from "../utils";
import { ModJs } from "./modJs";
import { DateOptions, TimeUntis } from "./type";

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
  format(m2: ModJs | DateOptions | Date | string | number, str: string, config: DiffConfig) {
    if (!isModJs(m2)) {
      m2 = new ModJs(m2 as any);
    }
    let diffTime = this.time - m2.time();


  }
  processConfig(config: DiffConfig) {
    if (config.maxTimeStamp) {

    }
  }
}
interface DiffConfig {
  maxTimeStamp?: number | "infinity"
  maxTimeUnits?: TimeUntis
  isUseWeek?: boolean
  isUseSeason?: boolean
}

function calculatTime(timeStamp: number) {
  const maxTimes = [1000, 60, 60, 24, 30, 12]
  const result = [];
}
