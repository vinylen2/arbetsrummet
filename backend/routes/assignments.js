const router = require('koa-router')({ prefix: '/assignments' });
const _ = require('lodash');
const Promise = require('bluebird');
const CircularJSON = require('circular-json');

const { Assignment, Material, Author, Subject, Grade } = require('../models');

async function getAllAssignments(ctx) {
  const assignments = await Assignment.findAll({
    include: [
      {
        model: Material,
        as: 'materials',
      },
      {
        model: Author,
      },
      {
        model: Subject,
        as: 'subjects',
      },
      {
        model: Grade,
        as: 'grades',
      },
    ],
  });

  ctx.body = {
    data: assignments,
  };
}

async function getAssignment(ctx) {
  const id = ctx.params.id;
  const assignments = await Assignment.findAll({
    where: { id },
    include: [
      {
        model: Material,
        as: 'materials',
      },
      {
        model: Author,
      },
      {
        model: Subject,
        as: 'subjects',
      },
      {
        model: Grade,
      },
    ],
  });

  ctx.body = {
    data: assignments,
  };
}

async function postAssignment(ctx) {
  const { title, instructions, description, courseWorkType, grades, author, materials, subject } = ctx.request.body;

  const assignment = await Assignment.create({
    title,
    description,
    instructions,
    courseWorkType,
  });

  if (author) {
    const sequelizeAuthor = await Author.findOrCreate({
      where: {
        email: author.email, 
      },
      defaults: {
        firstname: author.firstName,
        lastname: author.lastName,
        email: author.email,
      },
    });
    assignment.setAuthors(sequelizeAuthor[0]);
    assignment.dataValues.authors = _.flattenDeep(sequelizeAuthor);
  }

  if (grades) {
    const associatedGrades = await Promise.all(grades.map(async (grade) => {
      const sequelizeGrade = await Grade.findById(grade.id);
      assignment.setGrades(sequelizeGrade);
      return sequelizeGrade;
    }));

    assignment.dataValues.grades = _.flattenDeep(associatedGrades);
  }

  if (subject) {
    const sequelizeSubject = await Subject.findById(subject.id);
    assignment.setSubjects(sequelizeSubject);
    
    assignment.dataValues.subjects = [sequelizeSubject];
  }

  if (materials) {
    const associatedMaterials = await Promise.all(materials.map(async (material) => {
      const newMaterial = await Material.create({
        unionField: material.unionField,
        title: material.title,
        alternateLink: material.alternateLink,
        thumbnailUrl: material.thumbnailUrl,
        formUrl: material.formUrl,
        fileId: material.fileId,
        shareMode: material.shareMode,
        serviceId: material.serviceId,
        assignmentId: assignment.dataValues.id,
      });
      return newMaterial;
    }));
    assignment.dataValues.materials = associatedMaterials;
  }

  ctx.body = {
    data: assignment,
  };
}

async function searchAssignments(ctx) {
  const rawString = ctx.request.query.string;
  const string = (_.isEmpty(rawString[0]) ? null : rawString);
  const grades = (ctx.request.query['grades[]'] ? ctx.request.query['grades[]'] : null);
  const subjects= (ctx.request.query['subjects[]'] ? ctx.request.query['subjects[]'] : null);
  const modelInjector = {
    Material: Material,
    Author: Author,
    Subject: Subject,
    Grade: Grade,
  }

  const assignments = await Assignment.search(string, subjects, grades, modelInjector);
  
  ctx.body = {
    data: assignments,
  };

}
async function getRecentlyPublishedAssignments(ctx) {
  const assignments = await Assignment.findAll({
    limit: 9,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Material,
        as: 'materials',
      },
      {
        model: Author,
      },
      {
        model: Subject,
        as: 'subjects',
      },
      {
        model: Grade,
        as: 'grades',
      },
    ],
  });

  ctx.body = {
    data: assignments,
  };
}

router.get('/', getAllAssignments);
router.get('/recent', getRecentlyPublishedAssignments);
router.get('/search', searchAssignments);
router.get('/:id', getAssignment);
router.post('/', postAssignment);

module.exports = router;