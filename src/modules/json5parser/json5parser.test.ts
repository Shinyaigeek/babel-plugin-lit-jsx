import { join } from "path"
import { json5parser } from "./json5parser"

describe("json5parser", () => {
    test("test.json with comments should be load", () => {
        expect(json5parser(join(__dirname, "./test.json"))).toEqual({
            hoge: {
                "bar": "fuga"
            }
        })
    })
})