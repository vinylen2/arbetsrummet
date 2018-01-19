const path = require('path');

const tableName = path.basename(__filename, '.js');

module.exports = function modelExport(db, DataTypes) {
  const Model = db.define(tableName, {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    courseWorkType: DataTypes.STRING,
  });

  Model.findByAuthor = function (string, model) {
    return Model.findAll({
      include: [
        {
          model: model.Author,
          where: {
            [db.Op.or]: [
              {
                firstname: {
                  [db.Op.like]: `%${string}%`,
                },
              },
              {
                lastname: {
                  [db.Op.like]: `%${string}%`,
                },
              },
            ],
          },
        },
        {
          model: model.Material,
          as: 'materials',
        },
        {
          model: model.Subject,
          as: 'subjects',
        },
        {
          model: model.Grade,
        },
      ],
    });
  };

  Model.findByTitle = function (string, model) {
    return Model.findAll({
      where: {
        title: {
          [db.Op.like]: `%${string}%`,
        },
      },
      include: [
        {
          model: model.Material,
          as: 'materials',
        },
        {
          model: model.Author,
        },
        {
          model: model.Subject,
          as: 'subjects',
        },
        {
          model: model.Grade,
        },
      ],
    });
  };

  Model.findByGrade = function (query, model) {
    return Model.findAll({
      include: [
        {
          model: model.Grade,
          where: {
            [db.Op.or]: [
              {
                id: {
                  [db.Op.or]: query,
                },
              },
              {
                grade: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        },
        {
          model: model.Subject,
        },
        {
          model: model.Author,
        },
      ],
    })
  };

  Model.findByAuthorGradeSubject = function (query, model) {
    return Model.findAll({
      include: [
        {
          model: model.Subject,
          where: {
            [db.Op.or]: [
              {
                id: {
                  [db.Op.or]: query,
                },
              },
              {
                slug: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        },
        {
          model: model.Author,
          where: {
            [db.Op.or]: [
              {
                firstname: {
                  [db.Op.or]: query,
                },
              },
              {
                lastname: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        },
        {
          model: model.Grade,
          where: {
            [db.Op.or]: [
              {
                id: {
                  [db.Op.or]: query,
                },
              },
              {
                grade: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        }
      ],
    });
  };

  Model.findByAuthorGradeStringSubject = function (query, string, model) {
    return Model.findAll({
      // where: {
      //   title: {
      //     [db.Op.like]: `%${string}%`,
      //   },
      // },
      include: [
        {
          model: model.Subject,
          where: {
            [db.Op.or]: [
              {
                id: {
                  [db.Op.or]: query,
                },
              },
              {
                slug: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        },
        {
          model: model.Author,
          where: {
            [db.Op.or]: [
              {
                firstname: {
                  [db.Op.or]: query,
                },
              },
              {
                lastname: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        },
        {
          model: model.Grade,
          where: {
            [db.Op.or]: [
              {
                id: {
                  [db.Op.or]: query,
                },
              },
              {
                grade: {
                  [db.Op.or]: query,
                },
              },
            ],
          },
        }
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