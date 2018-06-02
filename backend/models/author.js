const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    getterMethods: {
      fullName() {
        return this.firstname + ' ' + this.lastname
      },
    },
  });

  // Model.associate = function (models) {
  //   this.belongsToMany(models.Assignment, { through: 'AssignmentAuthor' });
  // };

  return Model;
};
