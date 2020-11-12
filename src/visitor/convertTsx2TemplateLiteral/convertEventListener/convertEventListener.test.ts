import { convertEventListener } from "./convertEventListener";

describe("convertEventListener", () => {
  test("convert onXXX", () => {
    expect(convertEventListener("onClick")).toBe("@click");
  });
});
