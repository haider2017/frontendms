const express   = require('express');
const router    = express.Router();
const seneca    = require('seneca')();

router.get('/index', function(req, res, next) {
    console.log(`\n\tInside Default Route\n`);
    let net = req.query.net;
    seneca
    .use('seneca-amqp-transport')
    .client({    
        type: 'amqp',
        pin : 'role:clientservice,cmd:*',
        url : 'rabbitmq:5672'
        // url : "rabbitmq:5672"
    })//giving the image name of second microservice
    .act(`role:clientservice,cmd:salestax,net:${net}`, async function (err, result) {
        if(result)
            res.render('index', { title: 'Express',total: result.total });       
        if(err)
            res.status(500).json({"Error":err});
    })
});

module.exports = router;