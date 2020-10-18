import { ReactElement } from "react";

interface Props {
  Header: ReactElement;
  Footer: ReactElement;
}

export const Layout = (props: Props) => {
  return (
    <div>
      {props.Header}
      {props.Footer}
    </div>
  );
};
