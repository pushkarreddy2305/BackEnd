const router = require("express").Router();
const { project,job } = require("../../models");
const {jobQueue} = require('../../jobsQueue');


router.get("/", (req, res) => {

    let {id} = req.body;
    job.find({'projectId':id}).exec(
        (err,job) => {
            if(err){
                throw err
            }
            res.send(job)
        }
    );

});


module.exports = router;
