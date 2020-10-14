import {
  Expression,
  isCallExpression,
  isExpression,
  isJSXElement,
  isJSXExpressionContainer,
  isJSXFragment,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXSpreadAttribute,
  isJSXText,
  isSpreadProperty,
  JSXElement,
  nullLiteral,
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
  query: string;
  constructor(props: JSXElement) {
    this.element = props;
    this.queries = [];
    this.expressions = [];
    this.query = "";
  }

  render() {
    return templateLiteral(this.queries, this.expressions);
  }

  traverse() {
    this.handleQueries(this.element);
    this.queries.push(
      templateElement({
        raw: this.query,
      })
    );
  }

  handleExpressions(exp: any) {
    const expression = exp.expression;
    this.expressions.push(expression);
  }

  handleQueries(jsx: JSXElement) {
    if (isJSXElement(jsx)) {
      if (!isJSXIdentifier(jsx.openingElement.name)) {
        throw new Error("jsx should be identifier");
      }
      this.query += `<${jsx.openingElement.name.name}`;
      jsx.openingElement.attributes.forEach((attr) => {
        if (isJSXSpreadAttribute(attr)) {
          throw new Error("spread property is not supported");
        }
        if (isJSXExpressionContainer(attr.value)) {
          console.log(attr);
          this.query += ` ${attr.name.name}=`;
          this.queries.push(
            templateElement({
              raw: this.query,
            })
          );
          this.query = "";
          this.handleExpressions(attr.value);
        } else {
          if (isJSXElement(attr.value)) {
            //TODO
            throw new Error("jsx element props is not supported");
          }

          if (isJSXFragment(attr.value)) {
            //TODO
            throw new Error("jsx fragment props is not supported");
          }
          this.query += ` ${attr.name.name}=${
            attr.value?.value || nullLiteral()
          }`;
        }
      });

      if (jsx.openingElement.selfClosing) {
        this.query += " />";
      } else {
        this.query += ">";
      }

      jsx.children.forEach((child) => {
        if (isJSXText(child)) {
          this.query += child.value;
        }

        if (isJSXElement(child)) {
          this.handleQueries(child);
        }

        if (isJSXExpressionContainer(child)) {
          this.queries.push(
            templateElement({
              raw: this.query,
            })
          );
          this.query = "";
          this.handleExpressions(child);
        }
      });

      if (!jsx.openingElement.selfClosing) {
        if (!isJSXIdentifier(jsx.openingElement.name)) {
          throw new Error("jsx should be identifier");
        }

        if (isJSXMemberExpression(jsx.closingElement?.name)) {
          throw new Error(
            "jsx closingElement shouldn't be jsx member expression"
          );
        }
        this.query += `</${jsx.closingElement?.name.name}>`;
      }
    }
  }
}
