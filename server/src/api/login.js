const { Router } = require('express');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.body);
    res.send({
      token: 'test123',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
