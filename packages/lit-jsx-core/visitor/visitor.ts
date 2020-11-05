import { TraverseOptions } from "@babel/traverse";
import { isIdentifier } from "@babel/types";
import { astParser } from "./astParser/astParser";
import { convertComponent2Function } from "./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function";
import { convertReturnedJSXElementToString } from "./convertTsx2TemplateLiteral/convertReturnedJSXElementToString/convertReturnedJSXElementToString";
import { isCreateElement } from "./convertTsx2TemplateLiteral/isCreateElement/isCreateElement";
import { isForwardRef } from "./convertTsx2TemplateLiteral/isForwardRef/isForwardRef";
import { justifyJSXProps } from "./convertTsx2TemplateLiteral/justifyJSXProps/justifyJSXProps";

export const visitor: TraverseOptions = {
  JSXAttribute(nodePath) {
    justifyJSXProps(nodePath);
  },
  JSXElement(nodePath) {
    convertComponent2Function(nodePath);
  },
  //   ImportDeclaration(nodePath) {
  //     const importedJsxPath = resolvePath(target, nodePath.node.source.value);
  //     if (importedJsxPath) {
  //       compileEachFile(importedJsxPath);
  //     }
  //   },
  ReturnStatement(nodePath) {
    convertReturnedJSXElementToString(nodePath);
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
};

export { astParser };
