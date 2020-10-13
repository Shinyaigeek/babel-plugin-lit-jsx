import { JSXElement } from "@babel/types";
import { join } from "path";
import { astParser } from "../../ast/astParser/astParser";
import { isUserDefinedComponent } from "./isUserDefinedComponent";

describe("isUserDefinedComponent", () => {
  test("is user defined component", () => {
    const ast = astParser(join(__dirname, "./userDefinedComponent.tsx"));

    const jsx =
      //@ts-ignore
      ast.program.body[0].declarations[0].init.body.body[0].argument;

    expect(
      //@ts-ignore
      isUserDefinedComponent(jsx as JSXElement)
    ).toBeTruthy();
  });

  test("is not user defined component", () => {
    const ast = astParser(join(__dirname, "./simpleDiv.tsx"));

    const jsx =
      //@ts-ignore
      ast.program.body[0].declarations[0].init.body.body[0].argument;
    expect(isUserDefinedComponent(jsx as JSXElement)).toBeFalsy();
  });
});
