const router = require('koa-router')({ prefix: '/assignments' });

const { Assignment } = require('../models');

async function getAllAssignments(ctx) {
    const assignments = await Assignment.findAll();

    ctx.body = {
        data: assignments,
    };
}

router.get('/', getAllAssignments);

module.exports = router;