const path = require('path');

const tableName = path.basename(__filename, '.js');

const whereClauseFromQuery = function(db, string, subjects, grades) {
  if (string) {
    return {
      [db.Op.or]: [
        { title: { [db.Op.like]: `%${string}%` } },
        { '$authors.firstname$': { [db.Op.like] :`%${string}%` } },
        { '$authors.lastname$': { [db.Op.like] :`%${string}%` } },
      ],
    }
  } else if (string && subjects) {
    return {
      [db.Op.or]: [
        { title: { [db.Op.like]: `%${string}%` } },
        { '$authors.firstname$': { [db.Op.like] :`%${string}%` } },
        { '$authors.lastname$': { [db.Op.like] :`%${string}%` } },
        { '$subjects.id$': { [db.Op.in] : subjects } },
      ],
    }
  } else if (string && grades) {
    return {
      [db.Op.or]: [
        { title: { [db.Op.like]: `%${string}%` } },
        { '$authors.firstname$': { [db.Op.like] :`%${string}%` } },
        { '$authors.lastname$': { [db.Op.like] :`%${string}%` } },
        { '$grades.id$': { [db.Op.in] : grades } },
      ],
    };
  } else if (subjects && grades) {
    return {
      [db.Op.or]: [
        { '$subjects.id$': { [db.Op.in] : subjects } },
        { '$grades.id$': { [db.Op.in] : grades } },
      ],
    }
  } else if (string && subjects && grades) {
    return {
      [db.Op.or]: [
        { title: { [db.Op.like]: `%${string}%` } },
        { '$authors.firstname$': { [db.Op.like] :`%${string}%` } },
        { '$authors.lastname$': { [db.Op.like] :`%${string}%` } },
        { '$subjects.id$': { [db.Op.in] : subjects } },
        { '$grades.id$': { [db.Op.in] : grades } },
      ],
    }
  }
};

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    courseWorkType: DataTypes.STRING,
  });

  Model.search = function (string, subjects, grades, models) {
    const whereParams = whereClauseFromQuery(db, string, subjects, grades);
    return Model.findAll({
      where: whereParams,
      include: [
        {
          model: models.Author,
          as: 'authors',
        },
        {
          model: models.Subject,
          as: 'subjects',
        },
        {
          model: models.Grade,
        },
      ],
    });
  };

  Model.associate = function (models) {
    this.hasMany(models.Material, { as: 'materials' });
    this.hasMany(models.Comment, { as: 'comments' });
    this.hasMany(models.Vote, { as: 'votes' });

    this.belongsToMany(models.Author, { through: 'AssignmentAuthor' });
    this.belongsToMany(models.Subject, { through: 'AssignmentSubject' });
    this.belongsToMany(models.Grade, { through: 'AssignmentGrade' });
  };

  return Model;
};