const ExcelJS = require("exceljs");
const db = require("../DB/index");

const exportUsersToExcel = async (req, res) => {
	try {
		const users = await db.user.findAll();

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Users");

		worksheet.columns = [
			{ header: "ID", key: "id", width: 10 },
			{ header: "Email", key: "email", width: 30 },
			{ header: "Name", key: "name", width: 30 },
			{ header: "Phone No", key: "phoneNo", width: 20 },
			{ header: "Password", key: "password", width: 30 },
			{ header: "Created At", key: "createdat", width: 20 },
			{ header: "Action", key: "action", width: 10 },
			{ header: "Modified At", key: "modifiedAt", width: 20 },
			{ header: "Role", key: "role", width: 10 },
			{ header: "Activated", key: "activated", width: 10 },
			{ header: "Created By", key: "createdBy", width: 20 },
			{ header: "Modified By", key: "modifiedBy", width: 20 },
		];

		users.forEach((user) => {
			worksheet.addRow(user.toJSON());
		});

		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=" + "users.xlsx"
		);

		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while exporting data to Excel");
	}
};

module.exports = {
	exportUsersToExcel,
};
