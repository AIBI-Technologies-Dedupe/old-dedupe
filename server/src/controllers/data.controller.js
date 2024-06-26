const db = require("../DB/index");
const ExcelJS = require("exceljs");
const asyncHandler = require("express-async-handler");
const { formatRow } = require("../utils/dataUtils");

const BATCH_SIZE = 1000;

exports.importData = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    try {
        let rows = [];
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            if (row.getCell(1).value === "client_id") continue;
            
            const formattedRow = await formatRow(row, db);
            rows.push(formattedRow);

            if (rows.length >= BATCH_SIZE) {
                await db.raw_data.bulkCreate(rows);
                rows = [];
            }
        }

        if (rows.length > 0) {
            await db.raw_data.bulkCreate(rows);
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
