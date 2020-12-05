import { TraverseOptions } from "@babel/traverse";
import { isIdentifier, isJSXElement, isJSXFragment } from "@babel/types";
import { accessRootProgramRecursively } from "./accessRootProgramRecursively/accessRootProgramRecursively";
import { astParser } from "./astParser/astParser";
import { convertJSX2TemplateLiteral } from "./convertJSX2TemplateLiteral/convertJSX2TemplateLiteral";
import { convertComponent2Function } from "./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function";
import { insertHTMLImport } from "./convertTsx2TemplateLiteral/insertHtmlImport/insertHTMLImport";
import { isCreateElement } from "./convertTsx2TemplateLiteral/isCreateElement/isCreateElement";
import { isForwardRef } from "./convertTsx2TemplateLiteral/isForwardRef/isForwardRef";
import { justifyJSXProps } from "./convertTsx2TemplateLiteral/justifyJSXProps/justifyJSXProps";
import { removeReactImport } from "./convertTsx2TemplateLiteral/removeReactImport/removeReactImport";
import { tagHtmlPrefix } from "./convertTsx2TemplateLiteral/tagHtmlPrefix/tagHtmlPrefix";
import { isUserDefinedComponent } from "./isUserDefinedComponent/isUserDefinedComponent";

export const visitor: TraverseOptions = {
  JSXElement(nodePath) {
    if (!isJSXElement(nodePath.parent) && !isJSXFragment(nodePath.parent)) {
      const jsx = nodePath.node;
      const rootProgram = accessRootProgramRecursively(nodePath);
      const templateLiteral = convertJSX2TemplateLiteral(jsx, rootProgram);
      const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
      insertHTMLImport(rootProgram);
      removeReactImport(rootProgram);
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
      const rootProgram = accessRootProgramRecursively(nodePath);
      const templateLiteral = convertJSX2TemplateLiteral(jsx, rootProgram);
      const taggedTemplateLiteral = tagHtmlPrefix(templateLiteral);
      insertHTMLImport(rootProgram);
      nodePath.replaceWith(taggedTemplateLiteral);
    }
  },
};

export { astParser };
