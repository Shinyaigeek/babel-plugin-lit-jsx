import { NodePath } from "@babel/core";
import { JSXElement, JSXFragment, Program } from "@babel/types";
import { ConvertJSXElementToTemplateLiteral } from "../convertTsx2TemplateLiteral/convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

export const convertJSX2TemplateLiteral = (
  node: JSXElement | JSXFragment,
  rootProgram: NodePath<Program>
) => {
  const Converter = new ConvertJSXElementToTemplateLiteral(node, rootProgram);
  Converter.traverse();
  return Converter.render();
};
