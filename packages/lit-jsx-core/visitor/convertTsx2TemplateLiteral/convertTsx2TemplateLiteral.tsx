import traverse from "@babel/traverse";
import { File, isIdentifier } from "@babel/types";
import { join } from "path";
import { compileEachFile } from "../../../lit-jsx-jsx2templateLiteral/src/modules/compileEachFile/compileEachFile";
import { resolvePath } from "../../../lit-jsx-jsx2templateLiteral/src/modules/file/resolvePath/resolvePath";
import { convertComponent2Function } from "./convertComponent2Function/convertComponent2Function";
import { convertReturnedJSXElementToString } from "./convertReturnedJSXElementToString/convertReturnedJSXElementToString";
import { isCreateElement } from "./isCreateElement/isCreateElement";
import { isForwardRef } from "./isForwardRef/isForwardRef";
import { justifyJSXProps } from "./justifyJSXProps/justifyJSXProps";
import { convertJSX2TemplateLiteral } from "../convertJSX2TemplateLiteral/convertJSX2TemplateLiteral";
import { tagHtmlPrefix } from "./tagHtmlPrefix/tagHtmlPrefix";

export const convertTsx2TemplateLiteral = (ast: File, target: string) => {
  traverse(ast, {
    ImportDeclaration(nodePath) {
      const importedJsxPath = resolvePath(target, nodePath.node.source.value);
      if (importedJsxPath) {
        compileEachFile(importedJsxPath);
      }
    },

    JSXElement(nodePath) {
      const jsx = nodePath.node;
      const templateLiteral = convertJSX2TemplateLiteral(jsx);
      const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
      nodePath.replaceWith(taggedTemplateLiteral);
      nodePath.skip();
    },

    CallExpression(nodePath) {
      if (isCreateElement(nodePath)) {
        const [component, props] = nodePath.node.arguments;
        if (isIdentifier(props)) {
          if (isIdentifier(component)) {
            if (component.name === "tag") {
              nodePath.replaceWithSourceString(
                `html\`<\${${component.name}} \${Object.keys(${props.name}).map(key => \`\${key}="\${${props.name}[key]}"\`)}></\${${component.name}}>\``
              );
            } else {
              nodePath.replaceWithSourceString(
                `html\`\${${component.name}(${props.name})}\``
              );
            }
          }
        }
      }
    },

    MemberExpression(nodePath) {
      if (isForwardRef(nodePath)) {
        nodePath.replaceWithSourceString("undefined");
      }
    },
  });
};
