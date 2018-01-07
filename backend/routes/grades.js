const router = require('koa-router')({ prefix: '/grades' });

const { Grade } = require('../models');

async function getAllGrades(ctx) {
  const grades = await Grade.findAll();

  ctx.body = {
    data: grades,
  };
}


router.get('/', getAllGrades);

module.exports = router;