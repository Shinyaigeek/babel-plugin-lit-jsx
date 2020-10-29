import { join } from "path";
import { cli } from "../cli/cli";
import { commandParser } from "./commandParser";

describe("commandParser", () => {
  test("commandParser should be ok", async () => {
    const result = await cli(
      ["-t=./tsconfig", "-o=__generated__", "-e=App.tsx"],
      ".",
      join(__dirname, "./commandParser.ts")
    );

    expect(result.code).toBe(0);
  });
});
