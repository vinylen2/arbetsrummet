const router = require('koa-router')({ prefix: '/subjects' });

const { Subject } = require('../models');

async function getAllSubjects(ctx) {
  const subjects = await Subject.findAll();

  ctx.body = {
    data: subjects,
  };
}

router.get('/', getAllSubjects);

module.exports = router;