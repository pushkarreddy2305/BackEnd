const router = require("express").Router();
const { Project } = require("../../models");
const {jobQueue} = require('../../jobsQueue');
const controller = require('../../controllers/projects')

router.get("/", (req, res) => {
 controller.index().then(Projects => {
   res.send(Projects);
 });
});
//
//router.get("/:id", (req, res) => {
//  //console.log("id", req.params.id);
//  controller.read(req.params.id).then(Project => {
//    res.send(Project);
//  });
//});
//
//router.get("/:search", (req, res) => {
//  controller.search(req.params.search).then(x => {
//    res.send(x);
//  });
//});

router.post("/", (req, res) => {

    let {key,name,description,title,pageContent} = req.body;

    var proj = new Project({
        key,
        name,
        description
    });
    proj.save();

    let job = {
        ProjectId:proj._id,
        name:"CreateConfluence",
        service:"confluence",
        args:[
            key,
            name,
            description,
            title,
            pageContent,
        ]};
    jobQueue.add(job);
    res.send({'id':proj._id});
});

router.put("/", (req, res) => {
  console.log(req)
 let { id, name, description } = req.body;
 controller
   .update(id, name, description)
   .then(Project => res.json({ success: true, Project }))
   .catch(err => {
       res.json({
           success: false,
           error:err
       });
   });
});
//
//router.delete("/", (req,res) => {
//    controller.del(req.body.id)
//        .then(proj => res.json({deleted:true}))
//        .catch(err =>{
//            res.json({error:err.message})
//        })
//});

router.delete("/:id", (req, res) => {
  controller.remove(req.params.id)
  .then(result=> res.send(result))
  .catch(err => {
    res.json({ success: false });
  })
})

module.exports = router;
