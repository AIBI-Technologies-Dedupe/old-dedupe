// associations.js

module.exports = (db) => {
    db.raw_data.belongsTo(db.client, { foreignKey: 'client_id' });
    db.raw_data.belongsTo(db.product, { foreignKey: 'product_id' });
    db.raw_data.belongsTo(db.city, { foreignKey: 'city_id' });
    db.raw_data.belongsTo(db.state, { foreignKey: 'state_id' });
    db.raw_data.belongsTo(db.pincode, { foreignKey: 'pincode_id' });
    db.raw_data.belongsTo(db.city1, { foreignKey: 'city1_id' });
    db.raw_data.belongsTo(db.pincode1, { foreignKey: 'pincode1_id' });
    db.raw_data.belongsTo(db.state1, { foreignKey: 'state1_id' });
    db.raw_data.belongsTo(db.status, { foreignKey: 'status_id' });
  };
  