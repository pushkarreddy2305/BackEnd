const express = require("express");
const router = express.Router();

const CreateSpaceController = require("../../controllers/confluence/createSpaceAndPage");

router.post("/space", CreateSpaceController.createNewSpace);

router.post("/page", CreateSpaceController.createNewPage);

module.exports = router;
