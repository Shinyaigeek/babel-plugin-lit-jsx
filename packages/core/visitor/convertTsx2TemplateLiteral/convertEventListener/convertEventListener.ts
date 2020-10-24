export const convertEventListener = (eventName: string) => {
  return eventName.replace("on", "@").toLowerCase();
};
