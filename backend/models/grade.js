const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
      title: DataTypes.STRING,
  });


  Model.associate = function (models) {
    this.belongsToMany(models.Assignment, { through: 'AssignmentGrade' });
  };

  return Model;
};
