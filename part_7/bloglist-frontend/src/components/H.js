const H = ({ h = 1, text }) => {
  switch (h) {
    case 0:
      return <h1>{text}</h1>;

    case 1:
      return <h2>{text}</h2>;

    case 2:
      return <h3>{text}</h3>;

    default:
      return null;
  }
};

export default H;
