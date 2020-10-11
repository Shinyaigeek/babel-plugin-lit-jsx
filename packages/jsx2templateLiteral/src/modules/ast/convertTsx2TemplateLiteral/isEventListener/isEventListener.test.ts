import { isEventListener } from "./isEventListener";

describe("isEventListener", () => {
  test("onClick: should be ok", () => {
    expect(isEventListener("onClick")).toBeTruthy();
  });

  test("@click: should be err", () => {
    expect(isEventListener("@click")).toBeFalsy();
  });
});
