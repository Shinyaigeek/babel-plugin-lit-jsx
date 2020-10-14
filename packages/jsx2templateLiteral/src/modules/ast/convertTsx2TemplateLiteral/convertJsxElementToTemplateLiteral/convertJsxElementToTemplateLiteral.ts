import {
  Expression,
  isCallExpression,
  isExpression,
  isJSXSpreadAttribute,
  isSpreadProperty,
  JSXElement,
  TemplateElement,
  templateElement,
  templateLiteral,
  TemplateLiteral,
  tsConstructorType,
} from "@babel/types";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export class ConvertJSXElementToTemplateLiteral {
  element: JSXElement;
  queries: TemplateElement[];
  expressions: Expression[];
  constructor(props: JSXElement) {
    this.element = props;
    this.queries = [];
    this.expressions = [];
  }

  render() {
    return templateLiteral(this.queries, this.expressions);
  }

  traverse() {}
}
