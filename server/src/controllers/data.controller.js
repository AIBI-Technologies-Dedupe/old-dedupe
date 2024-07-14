const db = require("../DB/index");
const ExcelJS = require("exceljs");
const asyncHandler = require("express-async-handler");
const { processWorksheet } = require("../utils/dataUtils");
const { logger } = require("../configs/loggerConfig"); 
const { handleUploadHistory } = require("../utils/historyUtils")

exports.importData = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileBuffer = req.file.buffer; // Access the in-memory file buffer
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer); // Load the workbook from the buffer
  const worksheet = workbook.getWorksheet(1);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  console.log(today);

  try {
    const data = await processWorksheet(worksheet);

    await db.sequelize.transaction(async (t) => {
      for (const row of data) {
        await db.raw_data.create(row, { transaction: t });
      }
    });

    await handleUploadHistory(req.user.id, today, true);
    res.status(200).json({ message: "Data imported successfully." });
  } catch (error) {
    logger.error("Error importing data:", error);
    await handleUploadHistory(req.user.id, today, false);
    next(error); 
  }
});

exports.getCount = asyncHandler(async (req, res, next) => {
  try {
    const { count } = await db.raw_data.findAndCountAll();
    res.status(200).json({ count });
  } catch (error) {
    logger.error("Error retrieving count:", error);
    next(error); // Pass the error to the global error handler
  }
});

exports.deleteAllData = asyncHandler(async (req, res, next) => {
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
        logger.error("Error deleting data within transaction:", innerError);
        throw new Error(
          "An error occurred while deleting data within transaction."
        );
      }
    });
  } catch (error) {
    logger.error("Error deleting all data:", error);
    next(error);
  }
});
