import { join } from "path"
import { fileReader } from "../../file/fileReader/fileReader"
import { astParser } from "./astParser"

// astの中身自体については, tsc の管轄内であり, test を書くコストを考えて今一旦はそれを信じここでは source の入力に対してSourceFileの出力が帰ってくることだけを✅したい

describe("astParser", () => {
    test("astParser ts", () => {
        const source = fileReader(join(__dirname, "./source.ts"))

        const ast = (() => {
            try {
                astParser(source);
                return "ok"
            }catch{
                return "err"
            }
        })()

        expect(ast).toBe("ok")
    })

    test("astParser tsx", () => {
        const source = fileReader(join(__dirname, "./source.tsx"))

        const ast = (() => {
            try {
                astParser(source);
                return "ok"
            }catch{
                return "err"
            }
        })()

        expect(ast).toBe("ok")
    })
})