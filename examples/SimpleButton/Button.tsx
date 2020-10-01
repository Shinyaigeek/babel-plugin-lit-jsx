interface Props {
    label: string;
}

export const Button = (props: Props) => {
    return <button>{props.label}</button>
}