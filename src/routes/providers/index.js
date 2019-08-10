const router = require("express").Router();
const { Provider } = require("../../models");


//index
router.get('/',(req,res) => {
    // !! this gives us an unhandled promise rejection warning
    try{
    Provider.find({},
            (err,provider)=>{
                if(err) res.send(err);
                res.send(provider)
            }).exec().then((prov) => res.send(prov))
            .catch( err => res.send(err))
    }catch(E){
        console.log(E.message)
    }
});


router.get('/:id',(req,res) => {
    let id = req.params.id
    return Provider.findById(id).exec()
        .then(prov => res.send(prov))
        .catch(err=>res.send(err));
})

router.post('/' , (req,res) => {
    console.log(req.body)
    let {label,location,credentials,type} = req.body;
    console.log(label,location,credentials,type);
    return new Provider({
        label,
        location,
        credentials,
        type
    }).save()
        .then(prov => res.send(prov))
        .catch(err => res.send(err))
})

router.put('/:id' , async (req,res) => {
    let _id = req.params.id;
    let {label,location,credentials,type} = req.body;
    let original;

    await Provider.findById(_id)
        .exec()
        .then(prov => original = prov)
        .catch(err=>{throw err});

    let newData = {
        label: label || original.label,
        location: location || original.location,
        credentials: credentials || original.credentials,
        type: type || original.type,
    };
    return Provider.updateOne({_id},newData)
        .exec()
        .then(prov => {
            Provider.findById(_id)
                .exec(
                    (err,provider) => {
                        if(err) res.send({success:false,err});
                        res.send(provider);
                    })
        })
        .catch(err => res.send(err))
})

router.delete('/:id',(req,res) => {
    const _id = req.params.id
    return Provider.deleteOne({_id}).exec()
        .then(prov => res.send({success:true}))
        .catch(err => res.send({success:false,err}));

})


module.exports = router;
