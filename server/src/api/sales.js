const { Router } = require('express');

const router = Router();

const SaleHouseEntry = require('../models/garagesale');

router.get('/', async (req, res, next) => {
  try {
    const saleHouseEntries = await SaleHouseEntry.find();
    res.json(saleHouseEntries);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  SaleHouseEntry.findOneAndDelete(req.params.id)
    .then(res.status(200).json({ message: 'Successful' }))
    .catch((err) => next(err));
});

router.post('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.body);
    const saleHouseEntry = new SaleHouseEntry(req.body);
    const createdSaleHouseEntry = await saleHouseEntry.save();
    res.json(createdSaleHouseEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
