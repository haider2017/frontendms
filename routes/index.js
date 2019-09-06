const express   = require('express');
const router    = express.Router();
const seneca    = require('seneca')();

router.get('/', function(req, res, next) {
    let net = req.query.net;
    seneca
    .use('seneca-amqp-transport')
    .client({    
        type: 'amqp',
        pin : 'role:clientservice,cmd:*',
        url : process.env.AMQP_URL
    })//giving the image name of second microservice
    .act(`role:clientservice,cmd:salestax,net:${net}`, async function (err, result) {
        if(result)
            res.render('index', { title: 'Express',total: result.total });       
        if(err)
            res.status(500).json({"Error":err});
    })
});

module.exports = router;