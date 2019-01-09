// env
require('dotenv').config()
// JsonWebToken
const jwt = require('jsonwebtoken');
// MomenTimezone
const momentTimezone = require('moment-timezone')
// Models Admin
const Admin = require('../models/Admin.models.js')

// Register
exports.register = (req, res) => {

    if (!req.body.id_level_master || !req.body.email || !req.body.name || !req.body.username || !req.body.password) {
        res.status(400).send({
            success: false, 
            message: "67"
        });
    }else{
        //date now
        const now = momentTimezone()
                .tz("Asia/Jakarta").unix();

        const id_level_Master = req.body.id_level_master;
        const email = req.body.email;
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;

        //TODO: Validate email
        // Validate Email
        // function validateEmail(email) {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }

        // if(validateEmail(email) != true){
            
        // }
        
        Admin.findOne({username}, function(err, admin){
            if(admin){
                res.status(400).send({
                    success: false,
                    message: "10"
                });
            }else{
                const admin = new Admin({
                    id_level_Master,
                    email,
                    name,
                    username,
                    password,
                    created_at: now,
                    status: 1,
                    status_reg: 1,
                });
            
                //Save to db
                admin.save()
                .then(data => {
                    return res.send({
                        success: true,
                        messeage: "01"
                    });
                }).catch(err => {
                    res.status(500).send({
                        success: false,
                        messeage: "14"
                    });
                });
            }
        });
    }
}

//TODO: 
// Login
exports.login = (req, res) => {

    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get username and password from array
        const bearerUnamePass = bearer[1];
        // Split username and password
        const UnamePass = bearerUnamePass.split('||');
        //Get Username from array
        const username = UnamePass[0];
        //Get Password from array
        const password = UnamePass[1];

        //TODO: STILL DEVELOPING
        Admin.find({username,password})
        .then(admins => {
            if(admins[0] == 'undefined'){
                res.status(400).send({
                    succes: false,
                    message: "31"
                });
            }else{
                // Mock user
                const user = {
                    id: admins[0]._id,
                    username: admins[0].username,
                    email: admins[0].email
                }
                jwt.sign({user}, process.env.SECRET_KEY_KAT, { expiresIn: '3h' }, (err, token) => {
                    res.send({
                        success: true,
                        username: admins[0].username,
                        name: admins[0].name,
                        token
                    });
                  });
            }   
        });

    } else {
        // Forbidden
        res.status(403).send({
            success: false,
            message: "21"
        });
    }
}