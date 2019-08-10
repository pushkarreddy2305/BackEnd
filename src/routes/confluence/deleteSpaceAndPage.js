const express = require("express");
const router = express.Router();

const DeleteController = require("../../controllers/confluence/deleteSpaceAndPage");

router.delete("/space", DeleteController.deleteSpace);
router.delete("/page/:space/:title", DeleteController.deletePage);

// router.get("/get/space", SpaceController.getNewSpace);

module.exports = router;
