import { join } from "path";
import { fileReader } from "../../../io/src/modules/file/fileReader/fileReader";
import { astParser } from "./astParser";

// astの中身自体については, @babel/parser の管轄内であり, test を書くコストを考えて今一旦はそれを信じここでは source の入力に対してASTの出力が帰ってくることだけを✅したい

describe("astParser", () => {
  test("astParser ts", () => {
    const ast = (() => {
      try {
        astParser(join(__dirname, "./source.ts"));
        return "ok";
      } catch {
        return "err";
      }
    })();

    expect(ast).toBe("ok");
  });

  test("astParser tsx", () => {
    const ast = (() => {
      try {
        astParser(join(__dirname, "./source.ts"));
        return "ok";
      } catch {
        return "err";
      }
    })();

    expect(ast).toBe("ok");
  });
});
