const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.post("/add", function(req, res){
    console.log(req.body);
    const groceryItem = new GroceryModel(req.body);
    groceryItem.save(function(err){
        if(err) {
            console.log("err", err);
            res.status(400).send({
              message: err,
            });
        } else {
            res.send({ "results": "success"});
        }
    });
});

router.get("/getAll", function(req, res){
    GroceryModel.find({}, { __v: 0 }, function(err, data){
        if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
              });
        } else {
            res.send({results: data});
        }
    });
});

router.put("/updatePurchaseStatus", function(req, res) {
    GroceryModel.findOneAndUpdate({
        _id: req.body._id
    }, {
        isPurchased: true
    }, function(err){
           if(err) {
               console.log("err", err);
               res.status(400).send({
                message: err,
              });
           } else {
              res.send("Purchased status updated successfully");
           }
    });
});

router.delete("/deleteGroceryItem", function(req, res){
    const groceryItemId = req.body._id
    GroceryModel.remove({_id: groceryItemId}, function(err){
       if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
              });
           } else {
              res.send({"result": "success"});
           }
    });
});

module.exports = router;