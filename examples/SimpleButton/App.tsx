import { Button } from "./Button";

export const App = () => {
  return (
    <div className="app">
      {["hoge", "bar", "fuga"].map((el) => (
        <Button />
      ))}
    </div>
  );
};
