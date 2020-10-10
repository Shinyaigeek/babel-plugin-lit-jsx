import { isUserDefinedComponent } from "./isUserDefinedComponent";

describe("isUserDefinedComponent", () => {
  test("is user defined component", () => {
    expect(isUserDefinedComponent("Button")).toBeTruthy();
  });

  test("is not user defined component", () => {
    expect(isUserDefinedComponent("div")).toBeFalsy();
  });
});
