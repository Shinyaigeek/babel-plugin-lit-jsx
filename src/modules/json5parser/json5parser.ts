import { readFileSync } from "fs"
import json5 from "json5";

export const json5parser = (path: string) => {
    const jsonRawString = readFileSync(path, "utf-8");
    return json5.parse(jsonRawString);
}