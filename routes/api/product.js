const express = require("express");
const { User, Catalog, Product, Asset } = require('../../models')
const router = express.Router();

router.post('/buyProduct', async (req, res) => {
  try {
    const { id, address } = req.body;
    const catalogItem = await Catalog.findById(id);
    const user = await User.findOne({ address }).populate({
      path: 'asset',
      model: Asset
     });

    if (!catalogItem) {
      return res.status(404).json({ success: false, error: { errorMessage: 'Catalog item not found' } });
    }
    
    if (!user) {
      return res.status(404).json({ success: false, error: { errorMessage: 'User not found' } });
    }

    const { cost1, cost2, cost3, req1, req2, req3 } = catalogItem;
    const { cash1, cash2, cash3 } = user;

    if (cash1 < cost1 || cash2 < cost2 || cash3 < cost3) {
      return res.status(400).json({ success: false, error: { errorMessage: 'Insufficient funds' } });
    }

    if (
      (req1 && (!user.asset || user.asset.type !== 1 || user.asset.level > req1)) ||
      (req2 && (!user.asset || user.asset.type !== 2 || user.asset.level > req2)) ||
      (req3 && (!user.asset || user.asset.type !== 3 || user.asset.level > req3))
    ) {
      return res.status(400).json({ success: false, error: { errorMessage: 'User does not meet requirements' } });
    }

    user.cash1 -= cost1;
    user.cash2 -= cost2;
    user.cash3 -= cost3;
    await user.save();

    const product = new Product({
      address,
    });
    await product.save();

    res.json({ success: true, data: { resources: { cash1, cash2, cash3 } } });
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ success: false, error: { errorMessage: 'Internal server error' } });
  }

});

module.exports = router;
