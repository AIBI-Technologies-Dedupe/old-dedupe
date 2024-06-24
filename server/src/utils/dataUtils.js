exports.getOrInsert = async (model, column, value) => {
  const sanitizedValue = value != null ? String(value).trim() : value;
  const [record, created] = await model.findOrCreate({
    where: { [column]: sanitizedValue },
    defaults: { [column]: sanitizedValue },
  });
  return record.id;
};

exports.convertDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10);
};
