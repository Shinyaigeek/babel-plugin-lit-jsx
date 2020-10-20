import { ReactElement } from "react";

interface Props {
  Header: ReactElement;
  Footer: ReactElement;
  bar: string;
  fuga: string;
}

export const Layout = (props: Props) => {
  return (
    <div className={props.bar} id={props.fuga}>
      {props.Header}
      {props.Footer}
    </div>
  );
};
