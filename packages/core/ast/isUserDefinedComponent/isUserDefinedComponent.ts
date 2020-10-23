import { NodePath } from "@babel/traverse";
import { JSXElement } from "@babel/types";
import { getTagNameFromElement } from "../../../io/src/modules/util/getTagNameFromElement/getTagNameFromElement";
import { htmltags } from "../../../io/src/modules/util/htmltags/htmltags";

export const isUserDefinedComponent = (element: JSXElement) => {
  const tagName = getTagNameFromElement(element);
  return !htmltags.includes(tagName);
};
