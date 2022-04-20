import { Diff, ModJs } from "./core";

export function diff(m: ModJs) {
  return new Diff(m);
}
