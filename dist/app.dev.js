"use strict";

var express = require("express");

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.set('view engine', 'ejs');

var mongoose = require('mongoose');

var _require = require('child_process'),
    spawn = _require.spawn;

main()["catch"](function (err) {
  return console.log(err);
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect('mongodb://127.0.0.1:27017/buyNowitems', {
            useNewUrlParser: true
          }));

        case 2:
          console.log("Database Connected");

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

mongoose.set('strictQuery', true);
var item = mongoose.model('item', new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  },
  sellerName: {
    type: String,
    "boolean": true
  },
  sellerID: {
    type: String,
    required: true
  },
  productDetails: {
    type: String
  },
  productreviews: {
    type: Array,
    "default": [String]
  },
  sellerreviews: {
    type: Array,
    "default": [String]
  },
  price: {
    type: Number,
    minimum: 0,
    required: true
  }
})); // ////////////////////-Database-for-Chat-//////////////////////////////////

var userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});
var usersChat = new mongoose.model("userChat", userSchema); /////////////////////////////-Creating-Users-Data//////////////////////////////////////////////////////////////////////

var user = mongoose.model('user', new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  userorders: [{
    orderId: {
      type: String
    },
    orderstatus: {
      atSellerHub: {
        type: Boolean,
        "default": false
      },
      inTransit: {
        type: Boolean,
        "default": false
      },
      usersHub: {
        type: Boolean,
        "default": false
      },
      outofDelivery: {
        type: Boolean,
        "default": false
      }
    }
  }]
}));
var seller = mongoose.model('seller', new mongoose.Schema({
  name: {
    type: String
  },
  sellerId: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  orders: [{
    productId: {
      type: String
    },
    customerId: {
      type: String
    },
    customerPhone: {
      type: String
    },
    customerAddress: {
      type: String
    },
    status: {
      atSellerHub: {
        type: Boolean,
        "default": true
      },
      inTransit: {
        type: Boolean,
        "default": false
      },
      usersHub: {
        type: Boolean,
        "default": false
      },
      outofDelivery: {
        type: Boolean,
        "default": false
      }
    }
  }],
  sellerReview: [{
    sellerReview: {
      type: String
    },
    sellerRating: {
      type: String
    }
  }]
})); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// name , email , password , 
// Registration Form

app.get('/register', function (req, res) {
  res.render('registration');
  console.log(req.body);
  var ujjwal = new user({
    name: 'Ujjwal',
    email: 'ujjwal@gmail.com',
    password: 'abc123',
    orders: ['112345678', 'abc12345', '11112dd121']
  }); // ujjwal.save(function(err,succ){
  //     if(!err && succ){
  //         console.log(succ);
  //     }
  // })
}); // //////////////////////ByDefaultLoginFormOpens////////////////////////////

app.get('/', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('login'); // const data = new item({
          //         name : 'Pen',
          //         productDetails : 'Blue Colour Pen',
          //         productreviews :['Great Ink' , 'Good Milege'],
          //         sellerreviews :['Delivery On time' , 'Great Pricing'],
          //         price : 21.99,
          //         sellerName : 'GadaStationary',
          //         sellerID : 'bnow01'
          //     });
          // data.save(function(err,succ){
          //     if(!err && succ){
          //         console.log("Data Has Been Saved Successfully");
          //     }
          // });
          // const myData = item.find({name : 'Pen'},function(err,getData){
          //     console.log(getData);
          //     res.render('buyer',{getData : getData})
          // });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/login', function (req, res) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  user.findOne({
    email: email,
    password: password
  }, '_id', function (err, accept) {
    if (!err && accept) {
      console.log("User Found");
      var userId = accept.id; // res.render('search/'+)
      // console.log(userId);

      res.render('search', {
        userId: userId
      });
    }
  });
});
app.get('/sellerRegister', function (req, res) {
  res.render('sellerRegister');
});
app.post('/regis', function (req, res) {
  // console.log(req.body);
  // console.log(req.body.password);
  if (req.body.password[0] === req.body.password[1]) {
    console.log("Password is Matched");
  }

  var newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password2,
    orders: []
  });
  newUser.save(function (err, result) {
    if (!err && result) {
      console.log(result);
      console.log("Registration Successful");
      res.render('registrationSuccessful');
    }
  }); // console.log(newUser);
  // user.findOne({email : newUser.email},function(err,success){
  //     if(!err && success){
  //         success
  //         res.render('useralreadyexist');
  //     }
  //     else if(!err && !success){
  //         account = !account;
  //         res.render('registrationSuccessful');
  //     }
  //     else{
  //         res.send('<h1>Error During Registration</h1>')
  //     }
  // })
  // user.findOne({email : newUser.email},function(err,success){
  //     if(!err && !success){
  //         console.log("Data Not Found");
  //     }
  //     else if(!err && success){
  //         console.log("Data found");
  //         newUser.save(function(err,result){
  //             if(!err && result){
  //                 console.log("Data Saved");
  //             }
  //         });
  //     }
  //     else{
  //         console.log("Error in the Page");
  //     }
  // });
  // console.log(m);
});
app.post('/registerNew', function (req, res) {
  res.render('registration');
}); //////////////////////////////////////////////////////////////////////

app.get('/search', function (req, res) {
  var userId = req.params.id; // res.render('search',{userId})
  // console.log(req.body);

  console.log(req.params); // res.redirect(`/search?id=${userId}`);
});
app.post('/regisseller', function (req, res) {
  console.log(req.body);
  var newUser = new seller({
    name: req.body.name,
    sellerId: req.body.sellerid,
    password: req.body.password
  });
  newUser.save(function (err, saved) {
    if (!err && saved) {
      console.log(saved);
    }
  });
}); //    Yha se Error ko dekho

app.post('/search', function _callee2(req, res) {
  var getUserId, myItem, getitem, _getitem;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // console.log(userId);
          // console.log(req.body);
          getUserId = req.body.userId;
          myItem = req.body.searchItem;
          console.log(myItem);

          if (myItem != null && myItem != undefined) {
            getitem = item.find({
              name: myItem
            }, function (err, result) {
              console.log(result);

              if (!err) {
                if (result != [] || result != null || result != undefined) {
                  console.log(result);
                  res.render('buyer', {
                    ItemName: myItem,
                    getData: result,
                    getUserId: getUserId
                  });
                } else {
                  res.render('productnotfound');
                }
              }
            });
          } else {
            _getitem = item.find({
              name: myItem
            }, function (err, result) {
              console.log(result);

              if (!err) {
                if (result != [] || result != null || result != undefined) {
                  console.log(result);
                  res.render('buyer', {
                    ItemName: myItem,
                    getData: result,
                    getUserId: getUserId
                  });
                } else {
                  res.render('productnotfound');
                }
              }
            });
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Setting up for client seller chat

app.post('/contact', function (req, res) {
  // Send a response to the client indicating that the server has started
  res.sendFile(__dirname + '/index.html');
});
app.get('/contact', function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
}); // // Setting up for client seller chat
// app.post('/contact' , function(req,res){
//     // Spawn a new process for running the server file
//   const child = spawn('node', ['server.js']);
//     console.log('====================================');
//     console.log("Chat Server Starting");
//     console.log('====================================');
//   // Listen for any errors that occur in the child process
//   child.on('error', (err) => {
//     console.error(err);
//   });
//   // Send a response to the client indicating that the server has started
//   res.sendFile(__dirname+'/index.html');
// })
// app.post('/search',async function(req,res){
//    console.log(req.body.searchItem);
//    const myitem =  await item.findOne({name: req.body.searchItem});
//    console.log(myitem);
//      res.render('buyer',{getData : myitem});
// })

app.get('/seller', function (req, res) {
  res.render('seller');
});
app.get('/addData', function (req, res) {
  res.render('addData');
});
app.post('/updateData', function (req, res) {
  console.log(req.body);
  res.send('<h1>The Data has been received.</h1>');
  var newProduct = new item({
    name: req.body.productName,
    sellerName: req.body.sellerName,
    sellerID: req.body.sellerId,
    productDetails: req.body.productDetails,
    price: req.body.productPrice
  });
  newProduct.save(function (err, accept) {
    if (!err && accept) {
      console.log(accept);
    }
  });
});
app.get('/buynow', function (req, res) {
  res.render('buynow');
  console.log(req.body);
});
app.post('/:productId/:userId', function _callee3(req, res) {
  var getId, userId, getData;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          getId = req.params.productId;
          getId = getId + "";
          userId = req.params.userId;
          userId = userId + "";
          console.log("Product Id " + getId);
          console.log("User ID " + userId);
          getData = item.findById(getId, function (err, result) {
            // console.log(result.name);
            console.log(result);
            res.render('buynow', {
              getId: getId,
              userId: userId,
              product: result
            });
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/order/:productId/:userId/:sellerID', function (req, res) {
  // res.send('<h1>Your Order is successful</h1>');
  var myproductID = req.params.productId + "";
  var mycustomerID = req.params.userId + "";
  var mysellerID = req.params.sellerID + ""; // console.log("Product Id "+myproductID);
  // console.log("User ID "+mycustomerID);
  // console.log("Seller Id "+mysellerID);

  console.log(req.body);
  var address = req.body.address;
  address = address + "";
  var phonenumber = req.body.phonenumber;
  phonenumber = phonenumber + ""; // const tempSeller = new seller({
  //     name : "Jagmohan",
  //     sellerId : "bnow001",
  // })
  // tempSeller.save(function(err,result){
  //     if(!err && result){
  //         console.log("Data Saved");
  //     }
  // });
  // Starting the Search operation for items Entry.

  seller.find({
    sellerId: mysellerID
  }, function (err, result) {
    if (!err && result) {
      console.log("Seller Found");
      console.log(result);
    } else {
      console.log("Seller Not found");
    }
  });
  var orderData = {
    productId: myproductID,
    customerId: mycustomerID,
    customerPhone: phonenumber,
    customerAddress: address
  };
  console.log(orderData);
  var orders = [{
    orderId: myproductID,
    orderstatus: {
      atSellerHub: true,
      inTransit: false,
      usersHub: false,
      outofDelivery: false
    }
  }]; // updating Users Order data

  user.findOneAndUpdate({
    _id: mycustomerID
  }, {
    $push: {
      userorders: orders
    }
  }, function (error, success) {
    if (error || !success) {
      console.log(error);
    } else {
      console.log(success + "User Order Data Updated");
    }
  }); // -----------_---------_----------_--------------_---------------------

  seller.findOneAndUpdate({
    sellerId: mysellerID
  }, {
    $push: {
      orders: orderData
    }
  }, function (error, success) {
    if (error || !success) {
      console.log(error);
    } else {
      console.log(success + "Seller Data Updated");
      res.render('orderSuccess', {
        myproductID: myproductID,
        mysellerID: mysellerID
      });
    }
  }); // console.log(req.body);
});
app.post('/review', function (req, res) {
  var sellerID = req.body.sellerId;
  sellerID = sellerID + "";
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  var productID = req.body.productId;
  productID = productID + ""; // let seller-rating = req.

  var productreview = req.body.productReview;
  productreview = productreview + "";
  var sellerreview = req.body.sellerReview;
  sellerreview = sellerreview + "";
  var sellerrating = req.body.sellerRating;
  sellerrating = sellerrating + "";
  var productrating = req.body.productRating;
  productrating = productrating + "";
  console.log(req.body);
  console.log("Reviews Accepteds");
  seller.updateOne({
    sellerId: sellerID
  }, // filter to find the seller with the given ID
  {
    $push: {
      sellerReview: {
        sellerReview: sellerreview,
        sellerRating: sellerrating
      }
    }
  }, function (err, res) {
    if (err) throw err;
    console.log(res);
  }); //   --------------BSON Error----------------------
  //   var id = mongoose.Types.ObjectId(productID);

  var hex = /[0-9A-Fa-f]{6}/g;
  id = hex.test(productID) ? ObjectId(productID) : productID;
  item.updateOne({
    _id: id
  }, {
    $push: {
      productreviews: productreview,
      sellerreviews: sellerrating
    } // push the new data to the productreviews and sellerreviews arrays

  }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }); //   --------------BSON Error----------------------
  //   seller.findOneAndUpdate(
  //     { 'orders.productId': productID }, // filter to find the order with the given product ID
  //     { $set: { 'orders.$.productReview': productreview, 'orders.$.productRating': productrating } },
  //     (err, res) => {
  //       if (err) throw err;
  //       console.log(res);
  //     }
  //   );
  // let sellerReview = req.body.seller-review;
  //     sellerReview=sellerReview+"";
  // let productReview = req.body.product-review;
  //     productReview = productReview+"";
  // console.log(sellerReview);
  // console.log(productReview);
  // item.findByIdAndUpdate(req.params.productId ,
  //     { $push: { productreviews : productReview  } , $push: { sellerreviews : sellerReview  }  },
  //     function(err,accept){
  //     if(!err && accept){
  //         console.log("Data Found");
  //     }
  // })
}); // ---------------------Constructing-Seller-Login ----------------------

app.get('/sellerLogin', function (req, res) {
  var tempSeller = new seller({
    name: "seller01",
    sellerId: "bnow001",
    password: 'bnow001',
    orders: [],
    sellerReview: []
  }); // tempSeller.save();

  res.render('sellerLogin');
});
app.post("/sellerlogin", function (req, res) {
  var sellerID = req.body.sellerId;
  var sellerPassword = req.sellerPassword;
  seller.findOne({
    sellerId: sellerID
  }, function (err, success) {
    if (!err && success) {
      console.log(success);
      console.log("Seller Found");
      console.log(success.sellerId);
      res.render('sellerHome', {
        sellerID: success.sellerId
      });
    } else {
      res.send('<h1>Seller Not Found</h1>');
    }
  });
});
app.get('/sellerHome', function (req, res) {
  res.render('sellerHome');
  var sellerId = req.query;
  sellerId = sellerId + "";
  console.log(sellerId);
});
app.get('/updateOrder', function (req, res) {
  console.log(req.query);
  var sellerID = req.query.id;
  sellerID = sellerID + "";
  console.log(sellerID);
  seller.findOne({
    sellerId: sellerID
  }, function (err, success) {
    if (!err && success) {
      console.log(success);
      res.render('updateOrder', {
        seller: success
      }); // res.render('updateOrder');
    }
  });
}); // seller Homepage
// app.get('/mySellerLog',function(req,res){
//     console.log("Welcome to seller home");
//     res.render('mySellerLog')
// })
// get request for updating the transit status of the order 

app.get('/updateTransit', function (req, res) {
  var sellerId = req.query.arg1;
  sellerId = sellerId + "";
  var productID = req.query.arg2;
  productID = productID + "";
  var customerID = req.query.arg3;
  customerID = customerID + "";
  console.log("sellerId " + sellerId);
  console.log("productId " + productID);
  console.log("customerId " + customerID); //  seller.find({sellerID : sellerId }, function(err , success){
  //     console.log(success);
  //  })

  res.render('updateTransit', {
    sellerId: sellerId,
    customerID: customerID,
    productID: productID
  });
});
app.post('/transitUpdate', function _callee4(req, res) {
  var sellerID, productID, customerID, selectedDeliveryStatus, getSeller, myorderId, a, b, c, d, orderId, statusToUpdate, userId, userorderId, update, options, result;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(req.body);
          sellerID = req.body.sellerId;
          sellerID = sellerID + "";
          productID = req.body.productId;
          productID = productID + "";
          customerID = req.body.customerId;
          customerID = customerID + "";
          selectedDeliveryStatus = req.body.delivery_status;
          console.log(selectedDeliveryStatus); // const getSeller = await seller.findOne(
          //     { sellerId: sellerID, 'orders.productId': productID },
          //     (err, seller) => {
          //       if (err) {
          //         console.error(err);
          //       } else if (!seller) {
          //         console.log('Seller not found');
          //       } else {
          //         const order = seller.orders.find((o) => o.productId === productID);
          //         console.log(order);
          //       }
          //     }
          //   );

          _context5.next = 11;
          return regeneratorRuntime.awrap(seller.findOne({
            sellerId: sellerID,
            'orders.productId': productID
          }));

        case 11:
          getSeller = _context5.sent;
          console.log(getSeller); //   console.log(getSeller.orders[0]._id);

          myorderId = getSeller.orders[0]._id;
          a = false;
          b = false;
          c = false;
          d = false;

          if (selectedDeliveryStatus.includes('atSeller')) {
            a = true;
          }

          if (selectedDeliveryStatus.includes('inTransit')) {
            b = true;
          }

          if (selectedDeliveryStatus.includes('usersHub')) {
            c = true;
          }

          if (selectedDeliveryStatus.includes('outofDelivery')) {
            d = true;
          }

          console.log(a);
          console.log(b);
          console.log(c);
          console.log(d);
          orderId = myorderId;
          statusToUpdate = {
            atSellerHub: a,
            inTransit: b,
            usersHub: c,
            outofDelivery: d
          };
          seller.findOneAndUpdate({
            "orders._id": orderId
          }, {
            $set: {
              "orders.$.status": statusToUpdate
            }
          }, function (err, updatedSeller) {
            if (err) {
              console.error(err);
              return;
            }

            console.log(updatedSeller);
          }); // seller.findOneAndUpdate(
          //     // Query to find the specific order
          //     { 
          //         sellerId: sellerID,
          //         'orders._id': orderId
          //     },
          //     // Update to be applied
          //     {
          //         $set: {
          //             'orders.$.status.atSellerHub': false,
          //             'orders.$.status.inTransit': true
          //         }
          //     },
          //     // Options for the update (optional)
          //     {
          //         new: true // Return the updated document
          //     },
          //     // Callback function to handle the result
          //     (err, updatedSeller) => {
          //         if (err) {
          //             console.log(err);
          //             // Handle the error
          //         } else {
          //             console.log(updatedSeller);
          //             // Handle the updated seller document
          //         }
          //     }
          // );

          userId = customerID;
          userorderId = orderID;
          console.log(userId);
          console.log(userorderId);
          update = {
            $set: {
              statusToUpdate: statusToUpdate
            }
          };
          console.log(update);
          options = {
            arrayFilters: [{
              'elem.orderId': userorderId
            }] // Find the array element with the specified order ID

          };
          console.log(options);
          _context5.next = 39;
          return regeneratorRuntime.awrap(user.updateOne({
            _id: userId
          }, update, options));

        case 39:
          result = _context5.sent;
          console.log(result);
          res.render('lastPage');

        case 42:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // Adding Tracking Option

app.get('/trackOrder', function (req, res) {
  res.render('orderTracking');
});
app.post('/orderTrack', function (req, res) {
  console.log(req.body);
  console.log('====================================');
  console.log("Tracking Order");
  console.log('====================================');
  var orderNo = req.body.orderNumber;
  orderNo = orderNo + "";
  var orderIdToFind = orderNo; // Replace with the orderId you want to find

  user.findOne({
    'userorders.orderId': orderNo
  }, function (err, doc) {
    if (err) {
      res.send('<h1>The Order Does not exist</h1>');
      console.log(err);
    } else {
      var orderStatus = doc.userorders[0].orderstatus;
      console.log(orderStatus);
      var val = 20;
      var lastData = "";

      if (orderStatus.atSellerHub == true) {
        val = 25;
        lastData = "At Seller Hub";
      } else if (orderStatus.inTransit == true) {
        val = 50;
        lastData = "Under Transit";
      } else if (orderStatus.usersHub == true) {
        val = 80;
        lastData = "At your Nearest Hub ";
      } else if (orderStatus.outofDelivery == true) {
        val = 90;
        lastData = "Out Of Delivery ";
      } else {
        val = 100;
        lastData = "Delivered";
      }

      res.render('track', {
        orderNo: orderNo,
        lastData: lastData,
        val: val
      });
    }
  });
});
app.get('/track', function (req, res) {
  res.render('track');
});
app.listen(3000, function () {
  console.log("Server Has Started On Port 3000");
});