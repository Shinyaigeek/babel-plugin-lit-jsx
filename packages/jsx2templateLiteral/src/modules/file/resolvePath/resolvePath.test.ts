import { existsSync } from "fs";
import { join } from "path";
import { resolvePath } from "./resolvePath";

const abs = join(__dirname, "./from.ts");

describe("resolvePath", () => {
  test("abs/from.ts -> ./to.ts", () => {
    expect(existsSync(resolvePath(abs, "./to.ts"))).toBeTruthy();
  });

  test("abs/from.ts -> to.ts", () => {
    expect(existsSync(resolvePath(abs, "to.ts"))).toBeTruthy();
  });

  test("abs/from.ts -> ./to", () => {
    expect(existsSync(resolvePath(abs, "./to"))).toBeTruthy();
  });

  test("abs/from.ts -> ../../../../package.json", () => {
    expect(
      existsSync(resolvePath(abs, "../../../../package.json"))
    ).toBeTruthy();
  });
});
