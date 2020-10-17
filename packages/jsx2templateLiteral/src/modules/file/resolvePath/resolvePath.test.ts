import { existsSync } from "fs";
import { join } from "path";
import { resolvePath } from "./resolvePath";

const abs = join(__dirname, "./from.ts");

describe("resolvePath", () => {
  test("abs/from.tsx -> ./to.tsx", () => {
    expect(existsSync(resolvePath(abs, "./to.tsx")!)).toBeTruthy();
  });

  test("abs/from.tsx -> to.tsx", () => {
    expect(existsSync(resolvePath(abs, "to.tsx")!)).toBeTruthy();
  });

  test("abs/from.tsx -> ./to", () => {
    expect(existsSync(resolvePath(abs, "./to")!)).toBeTruthy();
  });

  test("abs/from.tsx -> ../../../../package.json", () => {
    expect(
      existsSync(resolvePath(abs, "../../../../package.json")!)
    ).toBeTruthy();
  });
});
