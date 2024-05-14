interface ShowProps {
  when: boolean;
  children: any;
}

const Show: React.FC<ShowProps> = (props) => {
  return props.when ? <>{props.children}</> : null;
};

export default Show;
