import { existsSync } from "fs";
import { join } from "path";
import { resolvePath } from "./resolvePath";

const abs = join(__dirname, "./from.tsx");

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

  test("abs/from.tsx -> node_modules", () => {
    expect(resolvePath(abs, "lit-html")).toBeUndefined();
  });

  test("abs/from.tsx -> local module", () => {
    expect(resolvePath(abs, "./module.ts")).toBeUndefined();
  });
});
