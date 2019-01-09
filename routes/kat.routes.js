module.exports = (app) => {
    // env
    require('dotenv').config()
    const jwt = require('jsonwebtoken');
    const kat = require('../controllers/kat.controllers.js');

    //Register POST
    app.post('/register', kat.register);

    // app.post('/posts', verifyToken, kat.login);

    // Login POST
    app.post('/login', kat.login);  

    // FORMAT OF TOKEN
    // Authorization: Bearer <access_token>

    // Example
    
    // app.post('/api/posts', verifyToken, (req, res) => {  
    //   jwt.verify(req.token, process.env.SECRET_KEY_KAT, (err, authData) => {
    //     if(err) {
    //       res.sendStatus(403);
    //     } else {
    //       res.json({
    //         message: 'Post created...',
    //         authData
    //       });
    //     }
    //   });
    // });

    // Verify Token
    function verifyToken(req, res, next) {
      // Get auth header value
      const bearerHeader = req.headers['authorization'];
      // Check if bearer is undefined
      if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
      } else {
        // Forbidden
        res.sendStatus(403);
      }
    }


}