const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.route("/sign-up").post(async (req,res) => {
    try{
        const foundUser = await User.findOne({Email: req.body.Email});

        if(foundUser){
            res.json({Email: req.body.Email, exist: 1})
        }
        else{
            const FirstName = req.body.FirstName;
            const LastName = req.body.LastName;
            const Email = req.body.Email;
            const Username = req.body.Username;
            const Password = req.body.Password;
            
            const newUser = new User({
                FirstName,
                LastName,
                Username,
                Email,
                Password
            });

            newUser.save();
            res.send("new user created")
        }
    }
    catch(error){
        res.send("Internal server error.")
    }
})

router.route("/login").get(async (req,res) => {
    try{
        User.find()
            .then(foundUsers => res.json(foundUsers))
    }
    catch(error){
        res.send("Internal server error.")
    }
})

router.route("/login").post(async (req,res) => {
    try{
        const foundUser = await User.findOne({Email: req.body.Email});
        if(foundUser){

            if(foundUser.Password == req.body.Password){
                res.json(foundUser);
            }
            else{
                res.json({error: 1, errorMessage: "Email/Password is invalid, please try again."})
            }
        }
        else{
            res.json({error: 1, errorMessage: "Email/Password is invalid, please try again."});
        }
    }
    catch (error){
        res.send("Internal server error.")
    }
})

router.route("/stock-addition").get(async(req,res) => {

})
router.route("/")

module.exports = router;