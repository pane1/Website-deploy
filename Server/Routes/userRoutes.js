
const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.route("/stock-addition").post(async(req,res) => {
    try{
        const Uid = req.body.Uid;
        const stock = {
            "Symbol": req.body.Symbol, 
            "BuyPrice": req.body.buyPrice,
            "BuyDate": req.body.buyDate,
            "SellPrice": req.body.sellPrice,
            "SellDate": req.body.sellDate
        };
        
        const foundUser = await User.findOne({Uid: req.body.Uid});
 
        if(foundUser){
            //checks if user already has this stock in collection
            const existStock = await User.findOne({Uid: req.body.Uid, Stocks:{$elemMatch :{"Symbol":req.body.Symbol}}});
            
            if(!existStock){
                await User.findOneAndUpdate({
                    Uid: req.body.Uid
                },{
                    $addToSet: {
                        "Stocks": stock
                    }
                }).then(() => res.json("added successfully"));
            }
            else{
                res.json("stock already in collection");
            }
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
                    "Stocks": stock
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
            res.json(foundUser.Stocks);
        }
        else{
            res.json("Could not load account data")
        }
    }
    catch{
        res.json("Internal server error.")
    }
})

router.route("/delete").post(async(req,res) => {
    const foundUser = await User.findOne({Uid: req.body.Uid});
    //console.log(req.body.Uid)
    try{
        if(foundUser){
            
            await User.updateOne({
                Uid: req.body.Uid
            },{
                $pull:{"Stocks":{"Symbol":req.body.Symbol}}
            })
            
            res.json("delete successful")
        }
        else{
            res.json("Could not delete")
        }
    }
    catch(error){
        res.json({error})
    }
})

router.route("/update").post(async(req,res) => {
    const foundUser = await User.findOne({Uid: req.body.Uid})

    
    try{
        if(foundUser){
            //res.json(req.body)
            await User.updateOne({
                Uid: req.body.Uid, 
                "Stocks" :{
                    $elemMatch:{
                        "Symbol": req.body.Symbol
                    }
                }
            },{
                $set: {
                    "Stocks.$":{
                        "Symbol": req.body.Symbol,
                        "BuyPrice": req.body.buyPrice,
                        "BuyDate": req.body.buyDate,
                        "SellPrice": req.body.sellPrice,
                        "SellDate": req.body.sellDate
                    }
                }
            });
            res.json("update successfully")
        }
        else{
            res.json("Could not update")
        }
    }
    catch(error){
        res.json({error})
    }
})
module.exports = router;