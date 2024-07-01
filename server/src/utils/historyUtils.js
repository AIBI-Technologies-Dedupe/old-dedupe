const db = require("../DB/index")
const asyncHandler = require("express-async-handler");

exports.handleUploadHistory = asyncHandler(async (userId, uploadDate, success) => {
    let existingHistory = await db.upload_history.findOne({
      where: {
        user_id: userId,
        uploadDate: uploadDate,
      },
    });
  
    if (existingHistory) {
      if (success) {
        existingHistory.successfulUploadCount += 1;
      } else {
        existingHistory.failUploadCount += 1;
      }
      await existingHistory.save();
    } else {
      const uploadData = {
        user_id: userId,
        uploadDate: uploadDate,
        successfulUploadCount: success ? 1 : 0,
        failUploadCount: success ? 0 : 1,
      };
      await db.upload_history.create(uploadData);
    }
  });