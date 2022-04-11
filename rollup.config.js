import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

module.exports = () => {
  return {
    input: "./src/index.ts",
    output: [
      {
        format: "cjs",
        file: pkg.output.cjs
        // sourcemap: true
      },
      {
        format: "es",
        file: pkg.output.esm
        // sourcemap: true
      },
      {
        format: "iife",
        name: "moodJs",
        file: pkg.output.iife
        // sourcemap: true
      },
      {
        format: "umd",
        name: "moodJs",
        file: pkg.output.umd
        // sourcemap: true
      }
    ],
    // plugins: [resolve(), typescript(), babel()]
    plugins: [resolve(), typescript(), babel(), terser()]
  };
};
