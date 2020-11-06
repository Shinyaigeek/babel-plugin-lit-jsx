import traverse from "@babel/traverse";
import { File, isIdentifier, isJSXElement, isJSXFragment } from "@babel/types";
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
import { isUserDefinedComponent } from "../isUserDefinedComponent/isUserDefinedComponent";

export const convertTsx2TemplateLiteral = (ast: File, target: string) => {
  traverse(ast, {
    ImportDeclaration(nodePath) {
      const importedJsxPath = resolvePath(target, nodePath.node.source.value);
      if (importedJsxPath) {
        compileEachFile(importedJsxPath);
      }
    },

    JSXElement(nodePath) {
      if (!isJSXElement(nodePath.parent) && !isJSXFragment(nodePath.parent)) {
        const jsx = nodePath.node;
        const templateLiteral = convertJSX2TemplateLiteral(jsx);
        const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
        nodePath.replaceWith(taggedTemplateLiteral);
      } else {
        const jsx = nodePath.node;
        if (isUserDefinedComponent(jsx)) {
          const litHtmlComponent = convertComponent2Function(jsx);
          if (litHtmlComponent) {
            nodePath.replaceWith(litHtmlComponent);
          }
        }
      }
    },

    JSXFragment(nodePath) {
      if (!isJSXElement(nodePath.parent) && !isJSXFragment(nodePath.parent)) {
        const jsx = nodePath.node;
        const templateLiteral = convertJSX2TemplateLiteral(jsx);
        const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
        nodePath.replaceWith(taggedTemplateLiteral);
      }
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
