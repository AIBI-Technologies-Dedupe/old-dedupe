const db = require("../DB/index");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { logger } = require("../configs/loggerConfig"); // Import the logger

exports.searchRecords = asyncHandler(async (req, res) => {
	let fieldNames = req.body.field_name;
	let searchTerms = req.body.search_term;
	const limit = parseInt(req.body.limit) || 100; // Number of records per page
	const page = parseInt(req.body.page) || 1; // Current page number
	const offset = (page - 1) * limit; // Offset for pagination

	if (!Array.isArray(fieldNames)) {
		fieldNames = fieldNames ? [fieldNames] : [];
	}

	if (!Array.isArray(searchTerms)) {
		searchTerms = searchTerms ? [searchTerms] : [];
	}

	// List of valid fields
	const validFields = [
		"first_name",
		"middle_name",
		"last_name",
		"father_name",
		"dob",
		"login_date",
		"residence_address",
		"residence_area",
		"company_name",
		"office_address",
		"compnay_area_name",
		"email_id",
		"aadhar_number",
		"pan_number",
		"passport_number",
		"election_id_number",
		"vehicle_number",
		"dl_number",
		"remarks",
		"client_name",
		"product_name",
		"residence_city_name",
		"residence_state_name",
		"residence_pincode",
		"company_city_name",
		"company_pincode",
		"company_state_name",
		"status_name",
		"mobile1", // Added mobile1 to valid fields
	];

	const conditions = [];

	// Build conditions for each valid field
	for (let i = 0; i < fieldNames.length; i++) {
		const fieldName = fieldNames[i];
		const searchTerm = searchTerms[i];

		if (validFields.includes(fieldName) && searchTerm) {
			const searchValue = `%${searchTerm.toUpperCase()}%`;
			switch (fieldName) {
				case "client_name":
					conditions.push({ "$client.name$": { [Op.like]: searchValue } });
					break;
				case "product_name":
					conditions.push({ "$product.name$": { [Op.like]: searchValue } });
					break;
				case "residence_city_name":
					conditions.push({ "$city.name$": { [Op.like]: searchValue } });
					break;
				case "residence_state_name":
					conditions.push({ "$state.name$": { [Op.like]: searchValue } });
					break;
				case "residence_pincode":
					conditions.push({ "$pincode.code$": { [Op.like]: searchValue } });
					break;
				case "company_city_name":
					conditions.push({ "$city1.name$": { [Op.like]: searchValue } });
					break;
				case "company_pincode":
					conditions.push({ "$pincode1.code$": { [Op.like]: searchValue } });
					break;
				case "company_state_name":
					conditions.push({ "$state1.name$": { [Op.like]: searchValue } });
					break;
				case "status_name":
					conditions.push({ "$status.name$": { [Op.like]: searchValue } });
					break;
				case "mobile1":
					conditions.push({ mobile1: { [Op.like]: searchValue } });
					break;
				default:
					conditions.push({ [fieldName]: { [Op.like]: searchValue } });
					break;
			}
		}
	}

	if (conditions.length === 0) {
		return res.status(400).json({
			error: "At least one valid field and search term must be provided",
		});
	}

	try {
		// Increment search count in search history
		const user_id = req.user.id;
		const today = new Date();
		today.setUTCHours(0, 0, 0, 0);

		// Find existing search history entry for today
		let searchHistory = await db.search_history.findOne({
			where: {
				user_id: user_id,
				searchdate: today,
			},
		});

		if (searchHistory) {
			// If found, increment searchCount
			searchHistory.searchCount += 1;
			await searchHistory.save();
		} else {
			// If not found, create new search history entry
			searchHistory = await db.search_history.create({
				user_id,
				searchdate: today,
				searchCount: 1,
			});
		}

		// Query the database with pagination
		const records = await db.raw_data.findAndCountAll({
			where: { [Op.and]: conditions },
			include: [
				{ model: db.client, as: "client", attributes: ["id", "name"] },
				{ model: db.product, as: "product", attributes: ["id", "name"] },
				{ model: db.city, as: "city", attributes: ["id", "name"] },
				{ model: db.state, as: "state", attributes: ["id", "name"] },
				{ model: db.pincode, as: "pincode", attributes: ["id", "code"] },
				{ model: db.city1, as: "city1", attributes: ["id", "name"] },
				{ model: db.pincode1, as: "pincode1", attributes: ["id", "code"] },
				{ model: db.state1, as: "state1", attributes: ["id", "name"] },
				{ model: db.status, as: "status", attributes: ["id", "name"] },
			],
			limit: limit,
			offset: offset,
		});

		if (records.count === 0) {
			return res.status(404).json({ error: "No records found" });
		}

		// Transform response to include readable names
		const response = records.rows.map((record) => ({
			id: record.id,
			client_name: record.client ? record.client.name : null,
			product_name: record.product ? record.product.name : null,
			first_name: record.first_name,
			father_name: record.father_name,
			dob: record.dob,
			mobile1: record.mobile1,
			pan_number: record.pan_number,
			status_name: record.status ? record.status.name : null,
		}));

		// Return records with success message
		res.json({
			message: "Records found",
			data: response,
			currentPage: page,
			totalPages: Math.ceil(records.count / limit),
		});
	} catch (error) {
		logger.error("Error fetching records:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

exports.getRecordById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		// Query the database to find the record by ID
		const record = await db.raw_data.findOne({
			where: { id: id },
			include: [
				{ model: db.client, as: "client", attributes: ["id", "name"] },
				{ model: db.product, as: "product", attributes: ["id", "name"] },
				{ model: db.city, as: "city", attributes: ["id", "name"] },
				{ model: db.state, as: "state", attributes: ["id", "name"] },
				{ model: db.pincode, as: "pincode", attributes: ["id", "code"] },
				{ model: db.city1, as: "city1", attributes: ["id", "name"] },
				{ model: db.pincode1, as: "pincode1", attributes: ["id", "code"] },
				{ model: db.state1, as: "state1", attributes: ["id", "name"] },
				{ model: db.status, as: "status", attributes: ["id", "name"] },
			],
		});

		if (!record) {
			return res.status(404).json({ error: "Record not found" });
		}

		// Transform response to include readable names
		const response = {
			id: record.id,
			client_name: record.client ? record.client.name : null,
			product_name: record.product ? record.product.name : null,
			first_name: record.first_name,
			middle_name: record.middle_name,
			last_name: record.last_name,
			father_name: record.father_name,
			dob: record.dob,
			login_date: record.login_date,
			residence_address: record.residence_address,
			residence_area: record.residence_area,
			company_name: record.company_name,
			office_address: record.office_address,
			compnay_area_name: record.compnay_area_name,
			email_id: record.email_id,
			aadhar_number: record.aadhar_number,
			pan_number: record.pan_number,
			passport_number: record.passport_number,
			election_id_number: record.election_id_number,
			vehicle_number: record.vehicle_number,
			dl_number: record.dl_number,
			remarks: record.remarks,
			client_name: record.client ? record.client.name : null,
			product_name: record.product ? record.product.name : null,
			residence_city_name: record.city ? record.city.name : null,
			residence_state_name: record.state ? record.state.name : null,
			residence_pincode: record.pincode ? record.pincode.code : null,
			company_city_name: record.city1 ? record.city1.name : null,
			company_pincode: record.pincode1 ? record.pincode1.code : null,
			company_state_name: record.state1 ? record.state1.name : null,
			status_name: record.status ? record.status.name : null,
			mobile1: record.mobile1,
		};

		// Return the record data with success message
		res.json({
			message: "Record found",
			data: response,
		});
	} catch (error) {
		logger.error("Error fetching record:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
