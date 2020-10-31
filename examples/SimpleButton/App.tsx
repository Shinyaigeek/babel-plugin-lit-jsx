import { Button } from "./Button";

const html = {
  hoge: {
    fuga: {
      Button,
    },
  },
};

export const App = () => {
  return (
    <>
      <div
        className="app"
        style={{
          color: "red",
        }}
      >
        {["hoge", "bar", "fuga"].map((el) => (
          <html.hoge.fuga.Button label={el} />
        ))}
      </div>
      <div>asdf</div>
    </>
  );
};
