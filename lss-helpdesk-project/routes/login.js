var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),              //mongo connection
    bodyParser = require('body-parser'),         //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

/* GET home page. */
router.route('/')
    .get(function(req, res, next) {
        res.render('login/show', { title: 'Login' });
    })
    //POST to login user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var nick     = req.body.nick;
        var password = req.body.password;

        //call the create function for our database
        mongoose.model('User').find({
            nick     : nick,
            password : password
        }, function (err, user) {
              if (err) {
                  res.render('login/show', { title: 'Login'
                  , message: "Desculpe, mas um erro não tratado ocorreu."
                  , oldNick: nick });

              } else if(!user.length){
                  res.render('login/show', { title: 'Login'
                  , message:  "Usuário não encontrado ou senha inválida."
                  , oldNick: nick });

              } else {
                  //user has been created
                  console.log('User login: ' + user);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("users");
                        // And forward to success page
                        res.redirect("/users");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(user);
                    }
                });
              }
        })
    });



module.exports = router;
