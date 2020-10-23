import {
  identifier,
  taggedTemplateExpression,
  TemplateLiteral,
} from "@babel/types";

export const tagHtmlPrefix = (templateLiteral: TemplateLiteral) => {
  return taggedTemplateExpression(identifier("html"), templateLiteral);
};
