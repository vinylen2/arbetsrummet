const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    courseWorkType: DataTypes.STRING,
  });

  Model.associate = function (models) {
    this.hasMany(models.Material, { as: 'materials' });
    this.hasMany(models.Comment, { as: 'comments' });
    this.hasMany(models.Vote, { as: 'votes' });

    this.belongsToMany(models.Subject, { through: 'AssignmentSubject' });
    this.belongsToMany(models.Grade, { through: 'AssignmentGrade' });
    this.belongsToMany(models.Author, { through: 'AsssignmentAuthor' });
  };

  return Model;
};