import { isUserDefinedComponent } from "./isUserDefinedComponent";

const UserDefinedComponent = () => {
  return <button></button>;
};

describe("isUserDefinedComponent", () => {
  test("is user defined component", () => {
    expect(isUserDefinedComponent("Button")).toBeTruthy();
  });

  test("is not user defined component", () => {
    expect(isUserDefinedComponent("div")).toBeFalsy();
  });
});
