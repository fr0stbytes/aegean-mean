const User = require('../models/user');

module.exports = (router) => {
  //Register user
  router.post('/register', (req,res) => {
    // check if all fields are filled
    if(!req.body.email) {
      res.json({success: false, message: 'You must provide an email.'});
    } else {
      if(!req.body.username) {
        res.json({success: false , message: 'You must provide a username'});
      } else {
        if(!req.body.username) {
          res.json({success: false, message: 'You must provide a password.'});
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          user.save( (err) => {
            if(err) {
              if (err.code === 11000) {
                res.json({success: false, message: 'Username or password already exists.'});
              } else {
                if (err.errors) {
                  if (err.errors.email) {
                    res.json({success: false, message: err.errors.email.message });
                  } else {
                    // Check if validation error is in the username field
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
          });
        }
      }
    }
  });

  return router;
}
