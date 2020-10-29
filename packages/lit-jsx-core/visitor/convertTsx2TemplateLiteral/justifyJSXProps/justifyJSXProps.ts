import { NodePath } from "@babel/traverse";
import {
  isStringLiteral,
  jsxAttribute,
  JSXAttribute,
  jsxIdentifier,
  stringLiteral,
} from "@babel/types";
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
    if (isStringLiteral(nodePath.node.value)) {
      nodePath.replaceWith(
        jsxAttribute(
          jsxIdentifier(proper),
          stringLiteral(`"${nodePath.node.value.value}"`)
        )
      );
    } else {
      nodePath.replaceWith(
        jsxAttribute(jsxIdentifier(proper), nodePath.node.value)
      );
    }
  }

  if (isEventListener(nodePath)) {
    justifyEventListener(nodePath);
  }
};
