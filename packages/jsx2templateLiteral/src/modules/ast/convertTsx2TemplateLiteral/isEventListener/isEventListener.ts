export const isEventListener = (listener: string) => {
  return listener.length > 2 && listener[0] === "o" && listener[1] === "n";
};
