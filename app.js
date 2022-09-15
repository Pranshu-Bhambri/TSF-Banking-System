const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

const favicon= require("serve-favicon");
const path= require("path");

app.use (favicon(path.join(__dirname, "public/images", "bank.png")));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/bankDB", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb+srv://admin-pranshu:MongoXPranshu24@cluster0.pzfo6fe.mongodb.net/bankDB", {useNewUrlParser: true, useUnifiedTopology: true});

const bankSchema = new mongoose.Schema({
  name: String,
  email: String,
  AccNo: String,
  mobile: Number,
  balance: Number
});

const Customer = mongoose.model("Transfer", bankSchema);

const cust1= new Customer({
    name: "Paarth Agarwal",
    email: "paarth12a@gmail.com",
    AccNo: "XXX9777XXX8",
    mobile: 9888127640, 
    balance: 10000
});

const cust2= new Customer({
    name: "Rohit Kumar",
    email: "kumar36rohit@gmail.com",
    AccNo: "XXX3477XXX6",
    mobile: 8860411290, 
    balance: 10000
});

const cust3= new Customer({
    name: "Rohan Singh",
    email: "r19singh@gmail.com",
    AccNo: "XXX8640XXX9",
    mobile: 8964223091, 
    balance: 10000
});

const cust4= new Customer({
    name: "Tanmay Sharma",
    email: "sharma.tan12@gmail.com",
    AccNo: "XXX9777XXX9",
    mobile: 9666400512, 
    balance: 10000
});

const cust5= new Customer({
    name: "Swastik Kumar",
    email: "swaskumar19@gmail.com",
    AccNo: "XXX4698XXX1",
    mobile: 9233512608, 
    balance: 10000
});

const cust6= new Customer({
    name: "Suresh Raina",
    email: "rainasuresh@gmail.com",
    AccNo: "XXX7931XXX1",
    mobile: 7796742089, 
    balance: 10000
});

const cust7= new Customer({
    name: "Hitesh Chopra",
    email: "chopra.hitesh@gmail.com",
    AccNo: "XXX8842XXX5",
    mobile: 8133204611, 
    balance: 10000
});

const cust8= new Customer({
    name: "Abhinav Mathur",
    email: "matabh99@gmail.com",
    AccNo: "XXX3691XXX3",
    mobile: 9193561200, 
    balance: 10000
});

const cust9= new Customer({
    name: "Mahendra Singh",
    email: "msdhoni@gmail.com",
    AccNo: "XXX7788XXX5",
    mobile: 9991264000, 
    balance: 10000
});

const cust10= new Customer({
    name: "Raghav Dhawan",
    email: "dhawan.raghav@gmail.com",
    AccNo: "XXX0946XXX5",
    mobile: 7633499909, 
    balance: 10000
});

// Add customers into database

// Customer.insertMany([cust1, cust2, cust3, cust4, cust5, cust6, cust7, cust8, cust9, cust10], function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully saved the customers");
//     }
// })

let returnToCustID, returnToTransferID, transferAmount, fromReqName, toReqName;

// let returnToCustID= undefined, returnToTransferID= undefined, transferAmount= undefined;

// transferAmount= undefined;
// returnToCustID=undefined, returnToTransferID= undefined;

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/customers", function(req, res){
    transferAmount= undefined, fromReqName= undefined, toReqName= undefined;
    Customer.find({}, function(err, custs){
        res.render("customers", {
            custs: custs,
            amount: transferAmount,
            fromReqName,
            toReqName
        });
    });
});

app.get("/customers/:custId", function(req, res){
    const requestedCustID = req.params.custId;

    //find customer with particular id to render his page
    Customer.findOne({_id: requestedCustID}, function(err, cust){
        if(cust){
            res.render("customer", {
                _id: cust._id,
                name: cust.name,
                email: cust.email,
                accno: cust.AccNo,
                mobile: cust.mobile,
                balance: cust.balance
            });
        }
        else{
            console.log("only custID not found");
            res.redirect("/notfound");
            // res.redirect("/");        
        }
    });
    
});

app.get("/customers/:custID/transfer", function(req, res){
    const requestedCustID= req.params.custID;
    returnToCustID= requestedCustID;
    Customer.findOne({_id: requestedCustID}, function(err, cust){
        if(cust){
            if(cust.balance> 100){
                // find all customers other than the person who is transferring the money
                Customer.find({_id: {$ne: requestedCustID}}, function(err, custs){
                    res.render("transfer", {
                        custs: custs,
                        requestedCustID,
                        name: cust.name
                    });
                });
            }
            else{
                console.log("You don't have enough balance");
                res.redirect("/notfound");
                // res.redirect("/about");
            }
        }
        else{
            console.log("custID/transfer not found");
            res.redirect("/notfound");
            // res.redirect("/");
        }
    })
    // Customer.find({_id: {$ne: requestedCustID}}, function(err, custs){
    //     res.render("transfer", {
    //         custs: custs,
    //         requestedCustID
    //     });
    // });
});

app.get("/customers/:custID/transferto-:transferID", function(req, res){
    const requestedFromCustID= req.params.custID;
    returnToCustID= requestedFromCustID;
    const requestedTransferID= req.params.transferID;
    returnToTransferID= requestedTransferID;
    
    console.log("from get transferto- method", returnToCustID, returnToTransferID);

    // returnToCustID= undefined;
    // returnToTransferID= undefined;

    if(requestedFromCustID!== requestedTransferID){

        Customer.findOne({_id: requestedFromCustID}, function(err, fromCust){
            // console.log(fromCust.balance);
            if(fromCust){
                Customer.findOne({_id: requestedTransferID}, function(error, toCust){
                    if(toCust){
                        if(fromCust.balance> 100){
                            console.log(toCust.balance);
                            res.render("transferto", {
                                fromName: fromCust.name,
                                toName: toCust.name,
                                fromaccno: fromCust.AccNo,
                                toaccno: toCust.AccNo,
                                balance: fromCust.balance,
                                returnToCustID,
                                returnToTransferID
                            });
                        }
                        else{
                            console.log("Again, you cannot transfer cuz bal< 100 !");
                            res.redirect("/notfound");
                            // res.redirect("/about");
                        }
                    }
                    else{
                        console.log("transferID not found in custID/transfer/transferto- ");
                        res.redirect("/notfound");
                        // res.render("about");
                    }
                });
            }
            else{
                console.log("custID not found in custID/transfer/transferto- ");
                res.redirect("/notfound");
                // res.redirect("/");        
            }
        });

    }
    else{
        console.log("Cannot transfer to same person !");
        res.redirect("/notfound");
        // res.redirect("/about");
    }

});

app.post("/customers", function(req, res){
    // <%= requestedFromCustID %>/transferto-<%= requestedTransferID %>
    transferAmount= req.body.transferAmount;
    console.log(transferAmount);
    // res.redirect(`/customers/${returnToCustID}`);

    console.log("from post req", returnToCustID, returnToTransferID);
    
    function func() {
        return new Promise(function (resolve, reject) {
            if(returnToCustID=== undefined && returnToTransferID=== undefined){
                reject();
            }
            else {
                resolve();
            }
        })
    }
    
    func().then(function(){
        Customer.updateOne({_id: returnToCustID}, {$inc: {balance: -transferAmount}}, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(returnToCustID);
                    console.log("Successfully updated the document1");
                }
            })

            Customer.updateOne({_id: returnToTransferID}, {$inc: {balance: transferAmount}}, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(returnToTransferID);
                    console.log("Successfully updated the document2");
                }
            })

            console.log("posted");

            console.log("from app.js", returnToCustID, returnToTransferID);

            // setTimeout(function(){

            Customer.find({}, function(err, custs){
                Customer.findOne({_id: returnToTransferID}, function(err, toCust){
                    if(toCust){
                        console.log(returnToCustID);
                        Customer.findOne({_id: returnToCustID}, function(err, fromCust){
                            if(fromCust){
                                setTimeout(function(){
                                    console.log("rendering customers")
                                    res.render("customers", {
                                        fromReqName: fromCust.name,
                                        toReqName: toCust.name,
                                        amount: transferAmount,
                                        custs: custs
                                    });
                                }, 2000)
                                // res.render("customers", {
                                //     fromName: fromCust.name,
                                //     toName: toCust.name,
                                //     amount: transferAmount,
                                //     custs: custs
                                // });
                            }
                            else{
                                console.log("custID not found ifor post /customers ");
                                console.log("Could not render customers for alert !");
                            }
                        });
                    }
                    else{
                        console.log("transferID not found ifor post /customers ");
                        res.redirect("/");
                    }
                });
            });
            // Customer.findOne({_id: returnToTransferID}, function(err, toCust){
            //     if(toCust){
            //         console.log(returnToCustID);
            //         Customer.findOne({_id: returnToCustID}, function(err, fromCust){
            //             if(fromCust){
            //                 res.render("customers", {
            //                     fromName: fromCust.name,
            //                     toName: toCust.name,
            //                     amount: transferAmount,
            //                 });
            //             }
            //             else{
            //                 console.log("Could not render customers for alert !");
            //             }
            //         });
            //     }
            //     else{
            //       res.render("home");
            //     }
            // });

            // transferAmount= undefined;
            // returnToCustID=undefined, returnToTransferID= undefined;
            // res.redirect("/customers"); 
        // }, 2000);

        // transferAmount= undefined;
        setTimeout(function(){
            returnToCustID= undefined, returnToTransferID= undefined;
        }, 2000);
        // res.redirect("/customers");
        // console.log(returnToCustID);
        // res.redirect(`/customers/${returnToCustID}`);
    }).catch(function(){
        // res.send("Got a problem :(");
        console.log("redirected !");
        res.redirect("/customers");
        console.log("Something Unexpexted Happened !")
    })
    
})

app.get("/notfound", function(req, res){
    res.render("404");
})


app.get('*', function(req, res){            //render 404 page when url is incorrect
    res.render("404");
    // res.status(404).send('what???');
});



// app.listen(3000, function() {
//     console.log("Server started on port 3000");
// });

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});


// <!-- <% let custID=JSON.stringify(cust._id); %>
// <% console.log(custID); %>
// <% console.log(requestedCustID); %>

// <% console.log(custID===requestedCustID); %> -->




// db.transfers.insertMany([{_id: 1, name: "Paarth Agarwal", email: "paarth12a@gmail.com", mobile: 9888127640, balance: 10000}, 
//                      {_id: 2, name: "Rohit Kumar", email: "kumar36rohit@gmail.com", mobile: 8860411290, balance: 10000},
//                      {_id: 3, name: "Rohan Singh", email: "r19singh@gmail.com", mobile: 8964223091, balance: 10000},
//                      {_id: 4, name: "Tanmay Sharma", email: "sharma.tan12@gmail.com", mobile: 9666400512, balance: 10000},
//                      {_id: 5, name: "Swastik Kumar", email: "swaskumar19@gmail.com", mobile: 9233512608, balance: 10000},
//                      {_id: 6, name: "Suresh Raina", email: "rainasuresh@gmail.com", mobile: 7796742089, balance: 10000},
//                      {_id: 7, name: "Hitesh Chopra", email: "chopra.hitesh@gmail.com", mobile: 8133204611, balance: 10000},
//                      {_id: 8, name: "Abhinav Mathur", email: "matabh99@gmail.com", mobile: 9193561200, balance: 10000},
//                      {_id: 9, name: "Mahendra Singh", email: "msdhoni@gmail.com", mobile: 9991264000, balance: 10000},
//                      {_id: 10, name: "Raghav Dhawan", email: "dhawan.raghav@gmail.com", mobile: 7633499909, balance: 10000}
//                     ])



// db.transfers.insertMany([{_id: 1, name: "Paarth Agarwal", email: "paarth12a@gmail.com", AccNo: "XXX9777XXX8", mobile: 9888127640, balance: 10000}, 
//                      {_id: 2, name: "Rohit Kumar", email: "kumar36rohit@gmail.com", AccNo: "XXX3477XXX6", mobile: 8860411290, balance: 10000},
//                      {_id: 3, name: "Rohan Singh", email: "r19singh@gmail.com", AccNo: "XXX8640XXX9", mobile: 8964223091, balance: 10000},
//                      {_id: 4, name: "Tanmay Sharma", email: "sharma.tan12@gmail.com", AccNo: "XXX9777XXX9", mobile: 9666400512, balance: 10000},
//                      {_id: 5, name: "Swastik Kumar", email: "swaskumar19@gmail.com", AccNo: "XXX4698XXX1", mobile: 9233512608, balance: 10000},
//                      {_id: 6, name: "Suresh Raina", email: "rainasuresh@gmail.com", AccNo: "XXX7931XXX1", mobile: 7796742089, balance: 10000},
//                      {_id: 7, name: "Hitesh Chopra", email: "chopra.hitesh@gmail.com", AccNo: "XXX8842XXX5", mobile: 8133204611, balance: 10000},
//                      {_id: 8, name: "Abhinav Mathur", email: "matabh99@gmail.com", AccNo: "XXX3691XXX3", mobile: 9193561200, balance: 10000},
//                      {_id: 9, name: "Mahendra Singh", email: "msdhoni@gmail.com", AccNo: "XXX7788XXX5", mobile: 9991264000, balance: 10000},
//                      {_id: 10, name: "Raghav Dhawan", email: "dhawan.raghav@gmail.com", AccNo: "XXX0946XXX5", mobile: 7633499909, balance: 10000}
//                     ])