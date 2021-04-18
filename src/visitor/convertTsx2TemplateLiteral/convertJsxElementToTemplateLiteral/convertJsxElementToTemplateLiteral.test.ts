import {
  arrowFunctionExpression,
  file,
  identifier,
  isJSXElement,
  isJSXFragment,
  program,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import { join } from "path";
import { extractJsxElementFromSouceFile } from "../../extractJsxElementFromSouceFile/extractJsxElementFromSourceFile";
import { ConvertJSXElementToTemplateLiteral } from "./convertJsxElementToTemplateLiteral";
import generate from "@babel/generator";

describe("convertJsxElementToTemplateLiteral", () => {
  test("simple jsx", () => {
    const jsx = extractJsxElementFromSouceFile(
      join(__dirname, "./__tests__/SimpleJsx.tsx")
    )[0];

    if (!isJSXElement(jsx)) {
      throw new Error("simple jsx is not jsx element");
    }

    // TODO fix type
    const converter = new ConvertJSXElementToTemplateLiteral(jsx!, "" as any);

    converter.traverse();

    const raw = generate(
      file(
        program([
          variableDeclaration("const", [
            variableDeclarator(
              identifier("SimpleJsx"),
              arrowFunctionExpression([], converter.render())
            ),
          ]),
        ])
      )
    ).code;

    expect(raw).toBe("const SimpleJsx = () => `<div>asdf</div>`;");
  });

  test("fragment jsx", () => {
    const jsx = extractJsxElementFromSouceFile(
      join(__dirname, "./__tests__/Fragment.tsx")
    )[0];

    if (!isJSXFragment(jsx)) {
      throw new Error("fragment is not jsx fragment element");
    }

    // TODO fix type
    const converter = new ConvertJSXElementToTemplateLiteral(jsx!, "" as any);

    converter.traverse();

    const raw = generate(
      file(
        program([
          variableDeclaration("const", [
            variableDeclarator(
              identifier("Fragment"),
              arrowFunctionExpression([], converter.render())
            ),
          ]),
        ])
      )
    ).code;

    expect(raw).toBe(`const Fragment = () => \`
    <div>asdf</div>
  \`;`);
  });

  test("self closing jsx", () => {
    const jsx = extractJsxElementFromSouceFile(
      join(__dirname, "./__tests__/SelfClosing.tsx")
    )[0];

    // TODO fix type
    const converter = new ConvertJSXElementToTemplateLiteral(jsx!, "" as any);

    converter.traverse();

    const raw = generate(
      file(
        program([
          variableDeclaration("const", [
            variableDeclarator(
              identifier("SelfClosing"),
              arrowFunctionExpression([], converter.render())
            ),
          ]),
        ])
      )
    ).code;

    expect(raw).toBe(`const SelfClosing = () => \`<input type="text" class="test" />\`;`);
  });
});
