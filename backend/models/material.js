const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      unionField: DataTypes.STRING,
      title: DataTypes.STRING,
      alternateLink: DataTypes.STRING,
      tumbnailUrl: DataTypes.STRING,
      formUrl: DataTypes.STRING,
      shareMode: {
        type: DataTypes.ENUM('VIEW', 'EDIT', 'STUDENT_COPY'),
        defaultValue: null,
      },       
    });

  return Model;
};
