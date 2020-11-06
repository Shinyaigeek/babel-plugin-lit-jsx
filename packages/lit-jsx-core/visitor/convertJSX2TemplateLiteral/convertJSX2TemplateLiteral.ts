import { JSXElement, JSXFragment } from "@babel/types";
import { ConvertJSXElementToTemplateLiteral } from "../convertTsx2TemplateLiteral/convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

export const convertJSX2TemplateLiteral = (node: JSXElement | JSXFragment) => {
  const Converter = new ConvertJSXElementToTemplateLiteral(node);
  Converter.traverse();
  return Converter.render();
};
