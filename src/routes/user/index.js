const router = require('express').Router();
const userController = require('../../controllers/userController');


router.post('/', async (req, res) => {
    const response = userController.create(req.body.username,req.body.groups);
    res.json(response);
});

router.get('/',
    (req,res) => {
        userController.findAll()
            .then(users => {
                res.send(users)
            }).catch(e => {
                res.send(e)
            })
    }
);

router.get('/:name',
    function(req,res){
        userController.find(req.params.name)
            .then(x =>{
                res.send(x)
            });
    }
);


module.exports = router;
