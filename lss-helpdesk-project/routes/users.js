var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),              //mongo connection
    bodyParser = require('body-parser'),         //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


//
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

//build the REST operations at the base for users
//this will be accessible from http://127.0.0.1:3000/login if the default route for / is left unchanged
router.route('/')
    //GET all users
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('User').find({}, function (err, users) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('users/index', {
                              title: 'Lista de Usuários',
                              "users" : users
                          });
                    },
                    //JSON response will show all user in JSON format
                    json: function(){
                        res.json(users);
                    }
                });
              }
        });
    })
    //POST a new user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name     = req.body.name;
        var nick     = req.body.nick;
        var password = req.body.password;

        //call the create function for our database
        mongoose.model('User').create({
            name     : name,
            nick     : nick,
            password : password
        }, function (err, user) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //user has been created
                  console.log('POST creating new user: ' + user);
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

/* GET New user page. */
router.get('/new', function(req, res) {
    res.render('users/new', { title: 'Add New User' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('User').findById(id, function (err, user) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('User').findById(req.id, function (err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + user._id);
        res.format({
          html: function(){
              res.render('users/show', {
                "user" : user
              });
          },
          json: function(){
              res.json(user);
          }
        });
      }
    });
  });

  //GET the individual blob by Mongo ID
  router.get('/:id/edit', function(req, res) {
      //search for the blob within Mongo
      mongoose.model('User').findById(req.id, function (err, user) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the blob
              console.log('GET Retrieving ID: ' + user._id);
              //format the date properly for the value to show correctly in our edit form
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('users/edit', {
                            user: user
                        });
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(user);
                   }
              });
          }
      });
  });

  //DELETE a User by ID
  router.delete('/:id/edit', function (req, res){
      //find blob by ID
      mongoose.model('User').findById(req.id, function (err, user) {
          if (err) {
              return console.error(err);
          } else {
              //remove it from Mongo
              blob.remove(function (err, user) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //Returning success messages saying it was deleted
                      console.log('DELETE removing ID: ' + user._id);
                      res.format({
                          //HTML returns us back to the main page, or you can create a success page
                            html: function(){
                                 res.redirect("/users");
                           },
                           //JSON returns the item with the message that is has been deleted
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : user
                                 });
                           }
                        });
                  }
              });
          }
      });
  });

// Export all of routes
module.exports = router;
