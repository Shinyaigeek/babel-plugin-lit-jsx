interface Props {
  label: string;
}

export const Button = (props: Props) => {
  return <button className="button">{props.label}</button>;
};
