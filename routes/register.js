var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('register_forma');
});

router.post('/', function(req, res, next){
    console.log(req.body);
    console.log(
        "Trenutni user je: "+req.body.username+' '+req.body.pswd
    );

    var trenutni_user = {
        username: req.body.username,
        pswd: req.body.pswd
    };

    console.log('Korisnik se pokusava registrovat');

    try {
        if (fs.existsSync("data/"+trenutni_user.username+'.todo')) {
            console.log('Korisnik vec postoji, tj. zauzeto je korisnicko ime');
            res.render('registered');

            return;
        }
    } catch(err) {
        console.log("Korisnik ne postoji, dakle, kreirat cemo njegov fajl");
    }

    console.log('Novi korisnik se dodaje u bazu korisnika');

    fs.appendFileSync('data/' + trenutni_user.username + '.todo', trenutni_user.pswd+'\n');

    req.session.username = trenutni_user.username;

    res.redirect('/todo');
});

module.exports = router;
