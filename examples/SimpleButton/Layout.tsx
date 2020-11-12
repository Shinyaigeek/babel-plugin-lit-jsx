interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  return <div>{props.children}</div>;
};
