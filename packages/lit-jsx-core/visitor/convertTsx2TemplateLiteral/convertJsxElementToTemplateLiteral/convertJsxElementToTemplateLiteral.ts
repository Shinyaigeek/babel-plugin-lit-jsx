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
  JSXFragment,
  nullLiteral,
  TemplateElement,
  templateElement,
  templateLiteral,
  TemplateLiteral,
  tsConstructorType,
} from "@babel/types";
import { isUserDefinedComponent } from "../../../dist/isUserDefinedComponent/isUserDefinedComponent";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export class ConvertJSXElementToTemplateLiteral {
  element: JSXElement | JSXFragment;
  queries: TemplateElement[];
  expressions: Expression[];
  query: string;
  constructor(props: JSXElement | JSXFragment) {
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
    const expression = exp.expression ?? exp;
    this.expressions.push(expression);
  }

  handleQueries(jsx: JSXElement | JSXFragment) {
    if (isJSXElement(jsx)) {
      if (isUserDefinedComponent(jsx)) {
        this.queries.push(
          templateElement({
            raw: this.query,
          })
        );
        this.query = "";
        this.handleExpressions(jsx);
      } else {
        if (!isJSXIdentifier(jsx.openingElement.name)) {
          throw new Error("jsx should be identifier");
        }
        this.query += `<${jsx.openingElement.name.name}`;
        jsx.openingElement.attributes.forEach((attr) => {
          if (isJSXSpreadAttribute(attr)) {
            throw new Error("spread property is not supported");
          }
          if (isJSXExpressionContainer(attr.value)) {
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
              throw new Error(
                "jsx element props should be compiled to function in the prior step"
              );
            }

            if (isJSXFragment(attr.value)) {
              throw new Error(
                "jsx fragment props should be compiled to function in the prior step"
              );
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

          if (isCallExpression(child)) {
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

    if (isJSXFragment(jsx)) {
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
    }
  }
}
