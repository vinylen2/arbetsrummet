const router = require('koa-router')({ prefix: '/assignments' });
const _ = require('lodash');
const Promise = require('bluebird');

const { Assignment, Material, Author, Subject } = require('../models');

async function getAllAssignments(ctx) {
  const assignments = await Assignment.findAll({
    // attributes: {
    //   exclude: ['updatedAt'],
    // },
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
    ],
  });

  ctx.body = {
    data: assignments,
  };
}

async function postAssignment(ctx) {
  const { title, description, courseWorkType, grades, author, materials, subjects } = ctx.request.body;

  const assignment = await Assignment.create({
    title,
    description,
    courseWorkType,
  });

  if (grades) {
    const gradeArray = JSON.parse(grades);
    const associatedGrades = await Promise.all(gradeArray.map(async (grade) => assignment.setGrades(grade)));
    assignment.dataValues.grades = _.flattenDeep(associatedGrades);
  }

  if (subjects) {
    const subjectArray = JSON.parse(subjects);
    const associatedSubjects = await Promise.all(subjectArray.map(async (subject) => assignment.setSubjects(subject)));
    assignment.dataValues.subjects = _.flattenDeep(associatedSubjects);
  }

  if (materials) {
    const materialArray = JSON.parse(materials);
    const associatedMaterials = await Promise.all(materialArray.map(async (material) => {
      const newMaterial = Material.create({
        unionField: material.unionField,
        title: material.title,
        alternateLink: material.alternateLink,
        thumbnailUrl: material.thumbnailUrl,
        formUrl: material.formUrl,
        shareMode: material.shareMode,
      });
      return newMaterial;
    }));
    assignment.dataValues.materials = _.flattenDeep(associatedMaterials);
  }

  ctx.body = {
    data: assignment,
  };

}

router.get('/', getAllAssignments);
router.get('/:id', getAssignment);
router.post('/', postAssignment);

module.exports = router;