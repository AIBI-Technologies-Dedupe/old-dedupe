const db = require('../DB/index')

const getOrInsert = async (model, column, value) => {
	const sanitizedValue = value != null ? String(value).trim() : value;
	const [record, created] = await model.findOrCreate({
		where: { [column]: sanitizedValue },
		defaults: { [column]: sanitizedValue },
	});
	return record.id;
};

const convertDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString().slice(0, 10);
};


const convertString = (input) => {
    if (input != null) {
        return String(input).trim();
    }
    return input; 
};

const processRow = async (row) => {
	const client_id = await getOrInsert(db.client, "name", row.getCell(1).value);
	const product_id = await getOrInsert(db.product, "name", row.getCell(2).value);
	const loginDateFormatted = convertDate(row.getCell(3).value);
	const firstNameFormatted = convertString(row.getCell(4).value);
    const middleNameFormatted = convertString(row.getCell(5).value);
    const lastNameFormatted = convertString(row.getCell(6).value);
    const fatherNameFormatted = convertString(row.getCell(7).value);
	const dobFormatted = convertDate(row.getCell(8).value);
	const doorNoFormatted = convertString(row.getCell(9).value);
    const residenceAddressFormatted = convertString(row.getCell(10).value);
    const areaFormatted = convertString(row.getCell(11).value);
	const city_id = await getOrInsert(db.city, "name", row.getCell(12).value);
	const state_id = await getOrInsert(db.state, "name", row.getCell(13).value);
	const pincode_id = await getOrInsert(db.pincode, "code", row.getCell(14).value);
    const companyNameFormatted = convertString(row.getCell(15).value);
    const officeAddressFormatted = convertString(row.getCell(16).value);
    const area1Formatted = convertString(row.getCell(17).value);
	const city1_id = await getOrInsert(db.city1, "name", row.getCell(18).value);
	const pincode1_id = await getOrInsert(db.pincode1, "code", row.getCell(19).value);
	const state1_id = await getOrInsert(db.state1, "name", row.getCell(20).value);
    const residenceLandlineFormatted = convertString(row.getCell(21).value);
    const officeLandlineFormatted = convertString(row.getCell(22).value);  
    const mobile1Formatted = convertString(row.getCell(23).value);  
    const mobile2Formatted = convertString(row.getCell(24).value);
    const emailFormatted = convertString(row.getCell(25).value);
    const aadharNumberFormatted = convertString(row.getCell(26).value);
    const panNumberFormatted = convertString(row.getCell(27).value);
    const passportNumberFormatted = convertString(row.getCell(28).value);
    const electionIdNumberFormatted = convertString(row.getCell(29).value);
    const vehicleNumberFormatted = convertString(row.getCell(30).value);
    const dlNumberFormatted = convertString(row.getCell(31).value);
	const status_id = await getOrInsert(db.status, "name", row.getCell(32).value);
    const remarksFormatted = convertString(row.getCell(33).value);

	return {
		client_id,
		product_id,
		login_date: loginDateFormatted,
		first_name: firstNameFormatted,
		middle_name: middleNameFormatted,
		last_name: lastNameFormatted,
		father_name: fatherNameFormatted,
		dob: dobFormatted,
		door_no: doorNoFormatted,
		residence_address: residenceAddressFormatted,
		area: areaFormatted,
		city_id,
		state_id,
		pincode_id,
		company_name: companyNameFormatted,
		office_address: officeAddressFormatted,
		area1: area1Formatted,
		city1_id,
		pincode1_id,
		state1_id,
		residence_landline: residenceLandlineFormatted,
		office_landline: officeLandlineFormatted,
		mobile1: mobile1Formatted,
		mobile2: mobile2Formatted,
		email_id: emailFormatted,
		aadhar_number: aadharNumberFormatted,
		pan_number: panNumberFormatted,
		passport_number: passportNumberFormatted,
		election_id_number: electionIdNumberFormatted,
		vehicle_number: vehicleNumberFormatted,
		dl_number: dlNumberFormatted,
		status_id,
		remarks: remarksFormatted,
	};
};

exports.processWorksheet = async (worksheet) => {
	const data = [];
	for (let i = 2; i <= worksheet.rowCount; i++) {
		const row = worksheet.getRow(i);
		if (row.getCell(1).value !== "client_id") {
			const rowData = await processRow(row);
			data.push(rowData);
		}
	}
	return data;
};

