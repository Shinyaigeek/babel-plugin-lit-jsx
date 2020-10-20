import { Footer } from "./Footer";
import { Header } from "./Header";
import { Layout } from "./Layout";

const hoge = {
  bar: "bar",
  fuga: "fuga",
};

export const App = () => {
  return (
    <div>
      <Layout Header={<Header />} Footer={<Footer />} {...hoge} />
    </div>
  );
};
