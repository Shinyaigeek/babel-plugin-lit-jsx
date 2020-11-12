import { Button } from "./Button";
import { Layout } from "./Layout";

const html = {
  hoge: {
    fuga: {
      Button,
    },
  },
};

export const App = () => {
  return (
    <Layout>
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
      <html.hoge.fuga.Button label="asdf" />
      <div className="ooo">asdf</div>
    </Layout>
  );
};
