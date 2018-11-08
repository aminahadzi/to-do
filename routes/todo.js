var express = require('express');
var router = express.Router();
var fs = require('fs');
  
router.get('/', function(req, res, next) {
    var username = req.session.username;
    console.log(req.session);
    fs.readFile('data/' + username + '.todo', 'utf8', function(err, contents) {
        var izgradjena_lista = [];
        if (contents) {
            izgradjena_lista = contents.split('\n').slice(1);
        }

        res.render('todo', {
            lista: izgradjena_lista,
            username : username
        });
    });
});

router.post('/', function(req, res, next){
    var username = req.session.username;
    var novi_task = req.body.task;
    fs.appendFileSync('data/' + username + '.todo', "\n"+novi_task);
    res.redirect('/todo');
});

module.exports = router;
