interface ShowProps {
  when: boolean;
  children: any;
}

const Show = (props: ShowProps) => {
  return props.when ? <>{props.children}</> : null;
};

export default Show;
