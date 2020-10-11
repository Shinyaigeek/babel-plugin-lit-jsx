import { NodePath } from "@babel/traverse";
import { jsxAttribute, JSXAttribute, jsxIdentifier } from "@babel/types";
import { convertEventListener } from "../convertEventListener/convertEventListener";
import { getPropsKey } from "../getPropsKey/getPropsKey";

export const justifyEventListener = (eventListener: NodePath<JSXAttribute>) => {
  const key = getPropsKey(eventListener);
  eventListener.replaceWith(
    jsxAttribute(
      jsxIdentifier(convertEventListener(key)),
      eventListener.node.value
    )
  );
};
