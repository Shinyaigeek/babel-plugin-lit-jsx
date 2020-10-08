import * as tsc from "typescript";

export const isJsxElement = (node: tsc.Node) => {
  return node.kind === 270;
};
