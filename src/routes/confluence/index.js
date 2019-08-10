const express = require("express");
const router = express.Router();

const CreateSpaceController = require("../../controllers/confluence/createSpaceAndPage.js");
const SpaceController = require("../../controllers/confluence/getSpaceAndPage.js");
const DeleteController = require("../../controllers/confluence/deleteSpaceAndPage.js");

router.delete("/space", DeleteController.deleteSpace);

router.delete("/page/:space/:title", DeleteController.deletePage);

router.post("/space", CreateSpaceController.createNewSpace);

router.post("/page", CreateSpaceController.createNewPage);

router.get("/page/:space/:title", SpaceController.contentByPageTitle);

router.get("/space/:space", SpaceController.getNewSpace);

router.get("/test",(req,res) => res.send("test test test"));

module.exports = router;

