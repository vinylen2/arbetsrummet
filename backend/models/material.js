const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      value: DataTypes.BOOLEAN,
    });
  };

  Model.associate = function (models) {
    this.hasOne(models.Assignment, { as: 'Materials' });
  };

  return Model;
};
