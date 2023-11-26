export default () => {
  var now = new Date();
  return new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toJSON().slice(0, 10);
}