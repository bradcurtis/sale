const { Router } = require('express');

const router = Router();

const SaleHouseEntry = require('../models/garagesale');

router.get('/', (req, res) => {
  res.json({
    message: 'globe',
  });
});

router.post('/', async (req, res, next) => {
  try {
      console.log(req.body);
    const saleHouseEntry = new SaleHouseEntry(req.body);
    const createdSaleHouseEntry = await saleHouseEntry.save();
    res.json(createdSaleHouseEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
