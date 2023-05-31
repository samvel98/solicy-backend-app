const express = require("express");
const { User } = require('../../models')
const { ObjectId } = require('mongoose').Types;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = User.findOne({ _id: ObjectId(id) })
    return res.send({
      success: true,
      user
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
  });
  }
});

module.exports = router;