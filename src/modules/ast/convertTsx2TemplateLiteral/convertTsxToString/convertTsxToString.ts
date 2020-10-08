import * as tsc from "typescript";

type f = (
  source: tsc.SourceFile
) => (
  context: tsc.TransformationContext
) => (rootNode: tsc.SourceFile) => tsc.SourceFile;

export const convertTsxToString: f = (source) => {
  return (context) => {
    return (rootNode) => {
      function visitor(node: tsc.Node): tsc.Node {
        if (tsc.isJsxElement(node)) {
          const stringJsx = node.getFullText(source);

          return tsc.createStringLiteral(stringJsx);
        }

        return tsc.visitEachChild(node, visitor, context);
      }

      return tsc.visitEachChild(rootNode, visitor, context);
    };
  };
};
