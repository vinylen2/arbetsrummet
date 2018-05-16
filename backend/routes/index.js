const router = require('koa-router')({ prefix: '/' });

async function getInfo(ctx) {

  ctx.body = {
    message: 'Here is something from the api',
  };
}

router.get('/', getInfo);

module.exports = router;