import { connect } from 'react-redux';

const Notification = (props) => {
  const { notification } = props;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return notification ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
