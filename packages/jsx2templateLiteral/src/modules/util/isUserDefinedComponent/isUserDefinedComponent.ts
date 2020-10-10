import { htmltags } from "../htmltags/htmltags";

export const isUserDefinedComponent = (tagName: string) => {
  return !htmltags.includes(tagName);
};
