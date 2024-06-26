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


exports.formatRow = async (row, db) => {
    const client_id = await getOrInsert(db.client, "name", row.getCell(1).value);
    const product_id = await getOrInsert(db.product, "name", row.getCell(2).value);
    const loginDateFormatted = convertDate(row.getCell(3).value);
    const formattedFirstName = convertString(row.getCell(4).value);
    const formattedMiddleName = convertString(row.getCell(5).value);
    const formattedLastName = convertString(row.getCell(6).value);
    const formattedFatherName = convertString(row.getCell(7).value);
    const dobFormatted = convertDate(row.getCell(8).value);
    const formattedDoorNo = convertString(row.getCell(9).value);
    const formattedResidenceAddress = convertString(row.getCell(10).value);
    const formattedArea = convertString(row.getCell(11).value);
    const city_id = await getOrInsert(db.city, "name", row.getCell(12).value);
    const state_id = await getOrInsert(db.state, "name", row.getCell(13).value);
    const pincode_id = await getOrInsert(db.pincode, "code", row.getCell(14).value);
    const formattedCompanyName = convertString(row.getCell(15).value);
    const formattedOfficeAddress = convertString(row.getCell(16).value);
    const formattedArea1 = convertString(row.getCell(17).value);
    const city1_id = await getOrInsert(db.city1, "name", row.getCell(18).value);
    const pincode1_id = await getOrInsert(db.pincode1, "code", row.getCell(19).value);
    const state1_id = await getOrInsert(db.state1, "name", row.getCell(20).value);
    const formattedResidenceLandline = convertString(row.getCell(21).value);
    const formattedOfficeLandline = convertString(row.getCell(22).value);
    const formattedMobile1 = convertString(row.getCell(23).value);
    const formattedMobile2 = convertString(row.getCell(24).value);
    const formattedEmailId = convertString(row.getCell(25).value);
    const formattedAadharNumber = convertString(row.getCell(26).value);
    const formattedPanNumber = convertString(row.getCell(27).value);
    const formattedPassportNumber = convertString(row.getCell(28).value);
    const formattedElectionIdNumber = convertString(row.getCell(29).value);
    const formattedVehicleNumber = convertString(row.getCell(30).value);
    const formattedDlNumber = convertString(row.getCell(31).value);
    const status_id = await getOrInsert(db.status, "name", row.getCell(32).value);
    const formattedRemarks = convertString(row.getCell(33).value);

    return {
        client_id,
        product_id,
        login_date: loginDateFormatted,
        first_name: formattedFirstName,
        middle_name: formattedMiddleName,
        last_name: formattedLastName,
        father_name: formattedFatherName,
        dob: dobFormatted,
        door_no: formattedDoorNo,
        residence_address: formattedResidenceAddress,
        area: formattedArea,
        city_id,
        state_id,
        pincode_id,
        company_name: formattedCompanyName,
        office_address: formattedOfficeAddress,
        area1: formattedArea1,
        city1_id,
        pincode1_id,
        state1_id,
        residence_landline: formattedResidenceLandline,
        office_landline: formattedOfficeLandline,
        mobile1: formattedMobile1,
        mobile2: formattedMobile2,
        email_id: formattedEmailId,
        aadhar_number: formattedAadharNumber,
        pan_number: formattedPanNumber,
        passport_number: formattedPassportNumber,
        election_id_number: formattedElectionIdNumber,
        vehicle_number: formattedVehicleNumber,
        dl_number: formattedDlNumber,
        status_id,
        remarks: formattedRemarks,
    };
};
