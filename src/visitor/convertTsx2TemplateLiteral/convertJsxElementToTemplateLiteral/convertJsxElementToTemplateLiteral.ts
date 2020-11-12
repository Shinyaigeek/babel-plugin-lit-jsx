import {
  CallExpression,
  callExpression,
  Expression,
  identifier,
  isCallExpression,
  isExpression,
  isJSXElement,
  isJSXEmptyExpression,
  isJSXExpressionContainer,
  isJSXFragment,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXNamespacedName,
  isJSXSpreadAttribute,
  isJSXText,
  isObjectExpression,
  isSpreadProperty,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  nullLiteral,
  TemplateElement,
  templateElement,
  templateLiteral,
  TemplateLiteral,
  tsConstructorType,
} from "@babel/types";
import { convertEventListener } from "../../convertTsx2TemplateLiteral/convertEventListener/convertEventListener";
import { isUserDefinedComponent } from "../../isUserDefinedComponent/isUserDefinedComponent";
import { convertComponent2Function } from "../convertComponent2Function/convertComponent2Function";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

type TableKeys = "className";

const table: {
  [P in TableKeys]: string;
} = {
  "className": "class",
};
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
        cooked: this.query,
      })
    );
  }

  handleExpressions(exp: JSXExpressionContainer | CallExpression) {
    const expression = isJSXExpressionContainer(exp) ? exp.expression : exp;
    if (isJSXEmptyExpression(expression)) {
      throw new Error("jsx empty expression is invalid");
    }
    this.expressions.push(expression);
  }

  handleQueries(jsx: JSXElement | JSXFragment) {
    if (isJSXElement(jsx)) {
      if (isUserDefinedComponent(jsx)) {
        this.queries.push(
          templateElement({
            raw: this.query,
            cooked: this.query,
          })
        );
        this.query = "";
        const litHtmlComponent = convertComponent2Function(jsx);
        if (litHtmlComponent) {
          this.handleExpressions(litHtmlComponent);
        }
      } else {
        if (!isJSXIdentifier(jsx.openingElement.name)) {
          throw new Error("jsx should be identifier");
        }
        this.query += `<${jsx.openingElement.name.name}`;
        jsx.openingElement.attributes.forEach((attr) => {
          if (isJSXSpreadAttribute(attr)) {
            throw new Error("spread property is not supported");
          }
          if (isJSXNamespacedName(attr.name)) {
            throw new Error("jsx namespaced attr is not supported");
          }
          const key = (() => {
            if (attr.name.name in table) {
              const proper = table[attr.name.name as TableKeys];
              return proper;
            }

            if (attr.name.name[0] === "o" && attr.name.name[1] === "n") {
              return convertEventListener(attr.name.name);
            }

            return attr.name.name;
          })();
          if (isJSXExpressionContainer(attr.value)) {
            this.query += ` ${key}=`;
            this.queries.push(
              templateElement({
                raw: this.query,
                cooked: this.query,
              })
            );
            this.query = "";
            if (key === "style") {
              if (isObjectExpression(attr.value.expression)) {
                this.handleExpressions(
                  callExpression(identifier("styleMap"), [
                    attr.value.expression,
                  ])
                );
              } else {
                throw new Error("jsx attr styles property should be object");
              }
            } else {
              this.handleExpressions(attr.value);
            }
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
            this.query += ` ${key}="${attr.value?.value || nullLiteral()}"`;
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
                cooked: this.query,
              })
            );
            this.query = "";
            this.handleExpressions(child);
          }

          if (isCallExpression(child)) {
            this.queries.push(
              templateElement({
                raw: this.query,
                cooked: this.query,
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
              cooked: this.query,
            })
          );
          this.query = "";
          this.handleExpressions(child);
        }
      });
    }
  }
}
