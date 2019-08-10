const express = require("express");
const router = express.Router();

const SpaceController = require("../../controllers/confluence/getSpaceAndPage");

router.get("/page/:space/:title", SpaceController.contentByPageTitle);

router.get("/space/:space", SpaceController.getNewSpace);

module.exports = router;
