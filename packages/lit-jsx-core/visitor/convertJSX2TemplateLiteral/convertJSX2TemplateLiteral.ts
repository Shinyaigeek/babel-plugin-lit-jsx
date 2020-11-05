import { JSXElement } from "@babel/types";
import { ConvertJSXElementToTemplateLiteral } from "../../dist/convertTsx2TemplateLiteral/convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

export const convertJSX2TemplateLiteral = (node: JSXElement) => {
  const Converter = new ConvertJSXElementToTemplateLiteral(node);
  Converter.traverse();
  return Converter.render();
};
