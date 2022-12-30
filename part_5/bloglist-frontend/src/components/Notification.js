const Notification = ({ message }) => (
  (message)
    ? (
      <div style={style[message.type]} className={message.type}>
        {message.content}
      </div>
    )
    : null
);

const style = {
  message: {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
};

style.success = {
  ...style.message,
  color: 'green',
};

style.error = {
  ...style.message,
  color: 'red',
};

export default Notification;
