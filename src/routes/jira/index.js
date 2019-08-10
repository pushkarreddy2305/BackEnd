const router = require('express').Router();
const JiraConnectorService = require('../../services/jira');


router.get('/projects', (req, res, next) =>
    new JiraConnectorService().getAllProjects().then((resp)=>{
        return res.json(resp.body)
    }).catch(err=> res.status(err.status).json(err))

);

router.post('/projects', (req, res, next) =>
    new JiraConnectorService().createProject(req.body).then((resp)=>{
        return res.json(resp.body)
    }).catch(err=> res.status(err.status).json(err))
);

router.put('/projects/:key', (req, res, next) =>
    new JiraConnectorService().updateProject(req.params.key,req.body).then((resp)=>{
        console.log(req.body)
        return res.json(resp.body)
    }).catch(err=> res.status(err.status).json(err))
);

router.delete('/projects/:key', (req, res, next) =>{
    new JiraConnectorService().deleteProject(req.params.key).then((resp)=>{
        return res.json()
    }).catch(err=> res.status(err.status).json(err))
}
);


router.get('/projects/:key', (req, res, next) =>
    new JiraConnectorService().getProjectByKey(req.params.key).then((resp)=>{
        return res.json(resp.body)
    }).catch(err=> res.status(err.status).json(err))
);

module.exports = router;
