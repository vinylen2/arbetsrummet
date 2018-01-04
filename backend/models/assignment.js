const path = requier('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
    const Model = db.define(tableName, {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        courseWorkType: DataTypes.STRING,
    });

    Model.associate = function (models) {
        this.hasMany(models.Material, { as: 'Materials' });
        this.hasMany(models.Comment, { as: 'Comments' });
        this.hasMany(models.Vote, { as: 'Votes' });

        this.belongsToMany(models.Subject, { through: 'AssignmentSubject' });
        this.belongsToMany(models.Grade, { through: 'AssignmentGrade' });
        this.belongsToMany(models.Author, { through: 'AsssignmentAuthor' });
    };

    return Model;
};