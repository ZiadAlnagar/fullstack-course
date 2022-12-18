const toClient = (schema, options) => schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (typeof options === 'function') options(returnedObject);
  },
});

module.exports = {
  toClient,
};
