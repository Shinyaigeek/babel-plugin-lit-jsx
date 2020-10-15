interface Props {
  label: string;
}

export const Button = (props: Props) => {
  return (
    <button className="button" onClick={(evt) => console.log(evt)}>
      {props.label}
    </button>
  );
};
