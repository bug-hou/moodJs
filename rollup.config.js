import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

module.exports = {
  input: "./src/index.ts",
  output: [
    {
      format: "umd",
      file: pkg.output.umd
    },
    {
      format: "cjs",
      file: pkg.output.cjs
    },
    {
      format: "es",
      file: pkg.output.esm
    }
  ],
  plugins: [resolve(), typescript(), babel()]
};
