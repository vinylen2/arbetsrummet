const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      unionField: DataTypes.STRING,
      title: DataTypes.STRING,
      alternateLink: DataTypes.STRING,
      thumbnailUrl: DataTypes.STRING,
      fileId: DataTypes.STRING,
      formUrl: DataTypes.STRING,
      serviceId: DataTypes.STRING,
      shareMode: {
        type: DataTypes.ENUM('VIEW', 'EDIT', 'STUDENT_COPY', 'DONT_SHARE'),
        defaultValue: null,
      },       
    });

  return Model;
};
