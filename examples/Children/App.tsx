import { Footer } from "./Footer";
import { Header } from "./Header";
import { Layout } from "./Layout";

export const App = () => {
  return (
    <div>
      <Layout Header={<Header />} Footer={<Footer />} />
    </div>
  );
};
