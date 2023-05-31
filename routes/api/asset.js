const express = require("express");
const { Catalog } = require('../../models')
const { ObjectId } = require('mongoose').Types;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const catalogItem = await Catalog.findById(id);
    if (!catalogItem) {
      return res.status(404).json({ error: 'Catalog item not found' });
    }

    const { _id, name, description, url } = catalogItem;
    const response = { 
      id: _id,
      name,
      description,
      imageUrl: url,
      price: catalogItem.price,
      req: catalogItem.req
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching catalog item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
