import { join } from "path";
import { fileReader } from "./fileReader";

describe("file reader", () => {
  test("existing file", () => {
    expect(fileReader(join(__dirname, "./hoge.txt"))).toBe("hogehoge");
  });

  test("unexisting file", () => {
    const result = (() => {
      try {
        return fileReader(join(__dirname, "./null.txt"));
      } catch {
        return "error";
      }
    })();

    expect(result).toBe("error")
  });
});
