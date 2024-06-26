exports.getOrInsert = async (model, column, value) => {
	const sanitizedValue = value != null ? String(value).trim() : value;
	const [record, created] = await model.findOrCreate({
		where: { [column]: sanitizedValue },
		defaults: { [column]: sanitizedValue },
	});
	return record.id;
};

exports.convertDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString().slice(0, 10);
};


exports.convertString = (input) => {
    if (input != null) {
        return String(input).trim();
    }
    return input; 
};


