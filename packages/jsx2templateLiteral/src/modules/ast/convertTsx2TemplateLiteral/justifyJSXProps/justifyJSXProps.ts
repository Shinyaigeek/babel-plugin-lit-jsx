import { NodePath } from "@babel/traverse";
import { jsxAttribute, JSXAttribute, jsxIdentifier } from "@babel/types";
import { getPropsKey } from "../getPropsKey/getPropsKey";
import { isEventListener } from "../isEventListener/isEventListener";
import { justifyEventListener } from "../justifyEventListener/justifyEventListener";

type TableKeys = "className";

const table: {
  [P in TableKeys]: string;
} = {
  "className": "class",
};

export const justifyJSXProps = (nodePath: NodePath<JSXAttribute>) => {
  const key = getPropsKey(nodePath);

  if (key in table) {
    const proper = table[key as TableKeys];
    nodePath.replaceWith(
      jsxAttribute(jsxIdentifier(proper), nodePath.node.value)
    );
  }

  if (isEventListener(nodePath)) {
    justifyEventListener(nodePath);
  }
};
