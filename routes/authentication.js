const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
              res.json({ success: true, message: 'Account registered!' }); // Return success
            }
          });
        }
      }
    }
  });


  //Unique email checker
  router.get('/checkEmail:email', (req,res) =>{
    if(!req.params.email) {
      res.json({ success: false, message: 'Email was not provided' });
    } else {
      User.findOne({email: req.params.email}, (err,user) => {
        if(err) {
          res.json({ success: false, message: err });
        } else {
          if(user) {
            res.json({ success: false, message: 'Email is already taken.' });
          } else {
            res.json({ success: true, message: 'Email is available.' });
          }
        }
      });
    }
  });

  //Unique username checker
  router.get('/checkUsername:username', (req,res) =>{
    if(!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' });
    } else {
      User.findOne({username: req.params.username}, (err,user) => {
        if(err) {
          res.json({ success: false, message: err });
        } else {
          if(user) {
            res.json({ success: false, message: 'Username is already taken.' });
          } else {
            res.json({ success: true, message: 'Username is available.' });
          }
        }
      });
    }
  });

  //Login User Function
  router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } }); // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });

  //Middleware to catch token for authenticated routes
  router.use((req,res,next) =>{
    const token = req.headers['authorization'];
    if(!token) {
      res.json({success: false, message: 'No token was provided'});
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
          res.json({success: false, message: 'Token invalid' + err});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  //Retrieve profile data
  router.get('/profile', (req,res) => {
    User.findOne({_id: req.decoded.userId}).select('username email').exec( (err, user) => {
      if(err) {
        res.json({success: false, message: err});
      } else {
        if(!user) {
          res.json({success: false, message: 'User not found'});
        } else {
          res.json({success: true, user: user});
        }
      }
    });
  });

  return router;
}
