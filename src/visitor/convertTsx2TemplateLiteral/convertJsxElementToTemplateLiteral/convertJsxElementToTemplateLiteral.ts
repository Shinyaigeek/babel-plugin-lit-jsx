import { NodePath } from "@babel/core";
import {
  CallExpression,
  callExpression,
  Expression,
  Identifier,
  identifier,
  isCallExpression,
  isExpression,
  isIdentifier,
  isJSXElement,
  isJSXEmptyExpression,
  isJSXExpressionContainer,
  isJSXFragment,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXNamespacedName,
  isJSXSpreadAttribute,
  isJSXText,
  isLiteral,
  isObjectExpression,
  isObjectProperty,
  isSpreadProperty,
  isStringLiteral,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  Literal,
  nullLiteral,
  Program,
  StringLiteral,
  TemplateElement,
  templateElement,
  templateLiteral,
  TemplateLiteral,
  tsConstructorType,
} from "@babel/types";
import { accessRootProgramRecursively } from "../../accessRootProgramRecursively/accessRootProgramRecursively";
import { assertObjectProperty } from "../../asertObjectProperty/asertObjectProperty";
import { convertEventListener } from "../../convertTsx2TemplateLiteral/convertEventListener/convertEventListener";
import { isUserDefinedComponent } from "../../isUserDefinedComponent/isUserDefinedComponent";
import { convertComponent2Function } from "../convertComponent2Function/convertComponent2Function";
import { insertUnsafeHTMLDirective } from "../insertUnsafeHTMLDirective/insertUnsafeHTMLDirective";
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
  unsafeMarkup?: StringLiteral | Identifier;
  rootProgram: NodePath<Program>;
  constructor(props: JSXElement | JSXFragment, rootProgram: NodePath<Program>) {
    this.element = props;
    this.queries = [];
    this.expressions = [];
    this.query = "";
    this.rootProgram = rootProgram;
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
            if (key === "dangerouslySetInnerHTML") {
              const obj = attr.value.expression;
              if (isObjectExpression(obj)) {
                const html = obj.properties.find((props) => {
                  if (isObjectProperty(props) && assertObjectProperty(props)) {
                    if (isStringLiteral(props.key)) {
                      return props.key.value === "__html";
                    }

                    if (isIdentifier(props.key)) {
                      return props.key.name === "__html";
                    }
                  }
                });

                if (!html) {
                  throw new Error(
                    "dangerouslySetInnerHTML should have __html property"
                  );
                }

                if (isObjectProperty(html)) {
                  const markup = html.value;
                  if (isStringLiteral(markup) || isIdentifier(markup)) {
                    this.unsafeMarkup = markup;
                  } else {
                    throw new Error(
                      "dangerouslySetInnerHTML.__html should be Identifier or StringLiteral"
                    );
                  }
                }
              } else {
                throw new Error(
                  "dangerouslySetInnerHTML's value should be object expression"
                );
              }
            } else {
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

        this.query += " />";

        if (this.unsafeMarkup) {
          this.queries.push(
            templateElement({
              raw: this.query,
              cooked: this.query,
            })
          );
          this.query = "";
          this.handleExpressions(
            callExpression(identifier("unsafeHTML"), [this.unsafeMarkup])
          );
          insertUnsafeHTMLDirective(this.rootProgram);
          this.unsafeMarkup = undefined;
        } else {
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
        }

        if (!isJSXIdentifier(jsx.openingElement.name)) {
          throw new Error("jsx should be identifier");
        }

        if (isJSXMemberExpression(jsx.closingElement?.name)) {
          throw new Error(
            "jsx closingElement shouldn't be jsx member expression"
          );
        }

        this.query += `</${jsx.openingElement.name.name}>`;
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
