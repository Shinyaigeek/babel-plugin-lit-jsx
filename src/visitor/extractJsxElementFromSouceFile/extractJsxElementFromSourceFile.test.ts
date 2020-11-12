import { isJSXElement } from "@babel/types";
import { join } from "path";
import { extractJsxElementFromSouceFile } from "./extractJsxElementFromSourceFile";

describe("extractJsxElementFromSourceFile", () => {
  test("arrow function", () => {
    expect(
      isJSXElement(
        extractJsxElementFromSouceFile(join(__dirname, "./arrow.tsx"))[0]
      )
    ).toBeTruthy();
  });

  test("blocky arrow function", () => {
    expect(
      isJSXElement(
        extractJsxElementFromSouceFile(join(__dirname, "./arrow.tsx"))[1]
      )
    ).toBeTruthy();
  });

  test("function", () => {
    expect(
      isJSXElement(
        extractJsxElementFromSouceFile(join(__dirname, "./func.tsx"))[0]
      )
    ).toBeTruthy();
  });
});
