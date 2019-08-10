const router = require('express').Router();
const controller = require('../../controllers/auth');

router.post('/',
    (req,res) => {
        controller.authenticate(
            req.body.username,
            req.body.password
        ).then(user =>{
            if(user.username != undefined ){
                req.session.loggedIn = true;
                req.session.user = user;
                res.json({success:true})
            }else{
                res.json({success:false});
            }
        }).catch((err) => {
            console.log(err);
            res.json({success:false});
        })
    }
);

router.get('/',
    (req,res) => {
        res.json(controller.currentUser(req.session))
    }
)

module.exports = router;
