export const resolvePath = (absPath: string, rel: string) => {
  if (rel[0] === "/") {
    return rel;
  }

  if ((rel[0] === "." && rel[1] === "/") || rel[0] !== ".") {
    // TODO なんとかする
    const asdf = absPath.split("/");
    asdf.pop();
    asdf.push(rel.replace("./", "") + ".tsx");
    return asdf.join("/");
  }
};
