const db = require("../DB/index");
const ExcelJS = require("exceljs");
const asyncHandler = require("express-async-handler");
const { getOrInsert, convertDate } = require("../utils/dataUtils");

exports.importData = asyncHandler(async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	const filePath = req.file.path;
	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.readFile(filePath);

	const worksheet = workbook.getWorksheet(1);

	try {
		for (let i = 2; i <= worksheet.rowCount; i++) {
			const row = worksheet.getRow(i);

			if (row.getCell(1).value === "client_id") continue;

			const client_id = await getOrInsert(
				db.client,
				"name",
				row.getCell(1).value
			);
			const product_id = await getOrInsert(
				db.product,
				"name",
				row.getCell(2).value
			);
			const loginDateFormatted = convertDate(row.getCell(3).value);
			const dobFormatted = convertDate(row.getCell(8).value);
			const city_id = await getOrInsert(db.city, "name", row.getCell(12).value);
			const state_id = await getOrInsert(
				db.state,
				"name",
				row.getCell(13).value
			);
			const pincode_id = await getOrInsert(
				db.pincode,
				"code",
				row.getCell(14).value
			);
			const city1_id = await getOrInsert(
				db.city1,
				"name",
				row.getCell(18).value
			);
			const pincode1_id = await getOrInsert(
				db.pincode1,
				"code",
				row.getCell(19).value
			);
			const state1_id = await getOrInsert(
				db.state1,
				"name",
				row.getCell(20).value
			);
			const status_id = await getOrInsert(
				db.status,
				"name",
				row.getCell(32).value
			);

			await db.raw_data.create({
				client_id,
				product_id,
				login_date: loginDateFormatted,
				first_name: row.getCell(4).value,
				middle_name: row.getCell(5).value,
				last_name: row.getCell(6).value,
				father_name: row.getCell(7).value,
				dob: dobFormatted,
				door_no: row.getCell(9).value,
				residence_address: row.getCell(10).value,
				area: row.getCell(11).value,
				city_id,
				state_id,
				pincode_id,
				company_name: row.getCell(15).value,
				office_address: row.getCell(16).value,
				area1: row.getCell(17).value,
				city1_id,
				pincode1_id,
				state1_id,
				residence_landline: row.getCell(21).value,
				office_landline: row.getCell(22).value,
				mobile1: row.getCell(23).value,
				mobile2: row.getCell(24).value,
				email_id: row.getCell(25).value,
				aadhar_number: row.getCell(26).value,
				pan_number: row.getCell(27).value,
				passport_number: row.getCell(28).value,
				election_id_number: row.getCell(29).value,
				vehicle_number: row.getCell(30).value,
				dl_number: row.getCell(31).value,
				status_id,
				remarks: row.getCell(33).value,
			});
		}

		res.status(200).json({ message: "Data imported successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while importing data." });
	}
});

exports.getCount = asyncHandler(async (req, res) => {
	const { count, row } = await db.raw_data.findAndCountAll();

	return res.status(200).json({ count });
});
exports.deleteAllData = asyncHandler(async (req, res) => {
	try {
		// Start a transaction
		await db.sequelize.transaction(async (transaction) => {
			try {
				// Delete from raw_data first
				await db.raw_data.destroy({ where: {}, transaction });

				// Delete from related tables
				await db.client.destroy({ where: {}, transaction });
				await db.product.destroy({ where: {}, transaction });
				await db.city.destroy({ where: {}, transaction });
				await db.state.destroy({ where: {}, transaction });
				await db.pincode.destroy({ where: {}, transaction });
				await db.city1.destroy({ where: {}, transaction });
				await db.pincode1.destroy({ where: {}, transaction });
				await db.state1.destroy({ where: {}, transaction });
				await db.status.destroy({ where: {}, transaction });

				// Reset auto-increment IDs
				await db.sequelize.query("ALTER TABLE raw_data AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE clients AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE products AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE cities AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE states AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE pincodes AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE city1s AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE pincode1s AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE state1s AUTO_INCREMENT = 1", {
					transaction,
				});
				await db.sequelize.query("ALTER TABLE statuses AUTO_INCREMENT = 1", {
					transaction,
				});

				res.status(200).json({
					message:
						"All data deleted and auto-increment IDs reset successfully.",
				});
			} catch (innerError) {
				console.error(innerError);
				throw new Error(
					"An error occurred while deleting data within transaction."
				);
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while deleting data." });
	}
});
