import { NodePath } from "@babel/traverse";
import { jsxAttribute, JSXAttribute, jsxIdentifier } from "@babel/types";

type TableKeys = "className";

const table: {
  [P in TableKeys]: string;
} = {
  "className": "class",
};

export const justifyJSXProps = (nodePath: NodePath<JSXAttribute>) => {
  const key = nodePath.node.name.name;

  // TODO why key can be JSXIdentifier ?
  if (typeof key === "string" && key in table) {
    const proper = table[key as TableKeys];
    nodePath.replaceWith(
      jsxAttribute(jsxIdentifier(proper), nodePath.node.value)
    );
  }
};
