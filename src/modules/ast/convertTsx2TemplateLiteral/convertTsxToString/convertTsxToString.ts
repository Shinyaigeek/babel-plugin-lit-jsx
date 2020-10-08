import { nextTick } from "process";
import * as tsc from "typescript";

export function convertTsxToString(node: tsc.Node) {

  if (node.kind === 270) {
    console.log("this is jsx");

    console.log(node);
  }

  return next();

  function next(): boolean {
    return tsc.forEachChild(node, convertTsxToString) ?? false;
  }
}
