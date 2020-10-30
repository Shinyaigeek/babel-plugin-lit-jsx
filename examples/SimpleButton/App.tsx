import { Button } from "./Button";

const html = {
  hoge: {
    fuca: {
      Button,
    },
  },
};

export const App = () => {
  return (
    <>
      <div className="app">
        {["hoge", "bar", "fuga"].map((el) => (
          <html.hoge.Button label={el} />
        ))}
      </div>
      <div>asdf</div>
    </>
  );
};
