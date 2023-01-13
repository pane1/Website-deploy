const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.route("/stock-addition").post(async(req,res) => {
    try{
        const Uid = req.body.Uid;
        const Stocks = [req.body.symbol];
        
        const foundUser = await User.findOne({Uid: req.body.Uid});
        console.log("s")
        if(foundUser){
            await User.findOneAndUpdate({
                Uid: req.body.Uid,
            },{
                $addToSet: {
                    Symbol: Stocks
                }
            }).then(() => res.json("added successfully"))
        }
        else{
            
            
            const newUser = new User({
                Uid
            });
           // console.log(newUser);
            await newUser.save();

            await User.findOneAndUpdate({
                Uid: req.body.Uid,
            },{
                $addToSet: {
                    Symbol: Stocks
                }
            }).then(() => res.json("added successfully"))
        }
        
        
        
    }   
    catch (error){
        res.send("Internal server error.")
    }
})

router.route("/").post(async(req,res) => {
    const foundUser = await User.findOne({Uid: req.body.Uid});
    try{
        if(foundUser){
            res.json(foundUser.Symbol);
        }
        else{
            res.json({Error: 1})
        }
    }
    catch{
        res.json("Internal server error.")
    }
})

module.exports = router;