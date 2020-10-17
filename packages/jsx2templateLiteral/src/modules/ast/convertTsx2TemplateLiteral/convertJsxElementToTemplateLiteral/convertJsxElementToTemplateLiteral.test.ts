import {
  arrowFunctionExpression,
  file,
  identifier,
  isJSXElement,
  program,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import { join } from "path";
import { codegen } from "../../codegen/codegen";
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
});
