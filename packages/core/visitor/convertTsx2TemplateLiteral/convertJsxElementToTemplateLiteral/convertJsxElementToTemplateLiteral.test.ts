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
//TODO
import { codegen } from "../../../../jsx2templateLiteral/src/modules/codegen/codegen";
import { extractJsxElementFromSouceFile } from "../../extractJsxElementFromSouceFile/extractJsxElementFromSourceFile";
import { ConvertJSXElementToTemplateLiteral } from "./convertJsxElementToTemplateLiteral";

describe("convertJsxElementToTemplateLiteral", () => {
  test("simple jsx", () => {
    const jsx = extractJsxElementFromSouceFile(
      join(__dirname, "./__tests__/SimpleJsx.tsx")
    )[0];

    if (!isJSXElement(jsx)) {
      throw new Error("simple jsx is not jsx element");
    }

    const converter = new ConvertJSXElementToTemplateLiteral(jsx!);

    converter.traverse();

    const raw = codegen(
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
    );

    expect(raw).toBe("const SimpleJsx = () => `<div>asdf</div>`;");
  });

  test("fragment jsx", () => {
    const jsx = extractJsxElementFromSouceFile(
      join(__dirname, "./__tests__/Fragment.tsx")
    )[0];

    if (!isJSXFragment(jsx)) {
      throw new Error("fragment is not jsx fragment element");
    }

    const converter = new ConvertJSXElementToTemplateLiteral(jsx!);

    converter.traverse();

    const raw = codegen(
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
    );

    expect(raw).toBe(`const Fragment = () => \`
    <div>asdf</div>
  \`;`);
  });
});
