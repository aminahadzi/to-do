var express = require('express');
var router = express.Router();
var fs = require('fs');

var crypt = require("../helpers/crypto");

router.get('/', function(req, res, next) {
    res.render('login_forma');
});

router.post('/', function(req, res, next){
    console.log(req.body);

    console.log(crypt.decrypt(crypt.encrypt("patlidzan")));

    console.log(
        "Trenutni user je: "+req.body.username+' '+req.body.pswd
    );

    var trenutni_user = {
        username: req.body.username,
        pswd: req.body.pswd
    };

    console.log('Korisnik se pokusava ulogovati');
    console.log("Trebamo provjeriti da li se on nalazi u nasoj bazi korisnika");

    fs.readFile('data/'+trenutni_user.username+'.todo', 'utf8', function (err, contents) {
        if (err){
            console.log("Korisnik ne postoji");
            res.render('notlog', {
                vrsta_problema: "Korisnik ne postoji"
            });
        }else{
            console.log('Korisnik vec postoji, tj. dakle, provjerimo sifru');
            if ( contents.split('\n')[0] === trenutni_user.pswd){
                //na ovaj nacin smo postavili preduvjete za provjeru autentikacije
                req.session.username = trenutni_user.username;

                console.log("Korisnik se moze ulogovat, sifra je ispravna");
                res.redirect('/todo');
            } else {
                console.log("Sifra nije ispravna, mora unijet ponovo");
                res.render('notlog', {
                    vrsta_problema: "Sifra nije ispravna, molim Vas unesite ponovo"
                });
            }
        }
    });
});

module.exports = router;
