import { Expression, Identifier, Literal, ObjectProperty } from "@babel/types";

interface ComputedObjectProperty extends ObjectProperty {
  key: Literal | Identifier;
}

export const assertObjectProperty = (
  target: ObjectProperty
): target is ComputedObjectProperty => {
  return !target.computed;
};
