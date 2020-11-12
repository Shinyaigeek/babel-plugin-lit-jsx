import { TraverseOptions } from "@babel/traverse";
import { isIdentifier, isJSXElement, isJSXFragment } from "@babel/types";
import { accessRootProgramRecursively } from "./accessRootProgramRecursively/accessRootProgramRecursively";
import { astParser } from "./astParser/astParser";
import { convertJSX2TemplateLiteral } from "./convertJSX2TemplateLiteral/convertJSX2TemplateLiteral";
import { convertComponent2Function } from "./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function";
import { convertReturnedJSXElementToString } from "./convertTsx2TemplateLiteral/convertReturnedJSXElementToString/convertReturnedJSXElementToString";
import { insertHTMLImport } from "./convertTsx2TemplateLiteral/insertHtmlImport/insertHTMLImport";
import { isCreateElement } from "./convertTsx2TemplateLiteral/isCreateElement/isCreateElement";
import { isForwardRef } from "./convertTsx2TemplateLiteral/isForwardRef/isForwardRef";
import { justifyJSXProps } from "./convertTsx2TemplateLiteral/justifyJSXProps/justifyJSXProps";
import { tagHtmlPrefix } from "./convertTsx2TemplateLiteral/tagHtmlPrefix/tagHtmlPrefix";
import { isUserDefinedComponent } from "./isUserDefinedComponent/isUserDefinedComponent";

export const visitor: TraverseOptions = {
  JSXElement(nodePath) {
    if (!isJSXElement(nodePath.parent) && !isJSXFragment(nodePath.parent)) {
      const jsx = nodePath.node;
      const templateLiteral = convertJSX2TemplateLiteral(jsx);
      const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
      const rootProgram = accessRootProgramRecursively(nodePath);
      insertHTMLImport(rootProgram);
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
      const rootProgram = accessRootProgramRecursively(nodePath);
      insertHTMLImport(rootProgram);
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
};

export { astParser };
