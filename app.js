const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
const mongoose = require('mongoose')  

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/buyNowitems',{useNewUrlParser : true}); 
    console.log("Database Connected");
}
mongoose.set('strictQuery', true);

const item = mongoose.model('item' ,new mongoose.Schema({
    name : {
        type : String,
        uppercase : true,
    },
    sellerName : {
        type : String,
        boolean : true,
    },
    sellerID : {
        type : String,
        required : true,
    },
    productDetails : {
        type : String,
    },
    productreviews : {
        type : Array,
        default : [String],
    },
    sellerreviews : {
        type : Array,
        default : [String],
    },
    price : {
        type : Number,
        minimum : 0,
        required : true,
    },
}));

/////////////////////////////-Creating-Users-Data//////////////////////////////////////////////////////////////////////

const user = mongoose.model('user',new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    userorders : [{
        orderId : {type : String},
        orderstatus : {
            atSellerHub : {
                type : Boolean , default : false,
            },
            inTransit : {
                type : Boolean, default : false,
            },
            usersHub : {
                type : Boolean, default : false,
            },
            outofDelivery : {
                type : Boolean, default : false,
            },
        }
    }
    ]
}));

const seller = mongoose.model('seller' , new mongoose.Schema({
    name : {type : String ,},
    sellerId : {type : String , unique : true },
    password : {type : String },
    orders : [
        {
            productId : {
                type : String
            },
            customerId : {
                type : String,
            },
            customerPhone : {
                type : String,
            },
            customerAddress : {
                type : String,
            },
            status : {
                atSellerHub : {
                    type : Boolean , default : true,
                },
                inTransit : {
                    type : Boolean, default : false,
                },
                usersHub : {
                    type : Boolean, default : false,
                },
                outofDelivery : {
                    type : Boolean, default : false,
                },
            }
        }
    ],
    sellerReview : [
        {
            sellerReview : {
                type : String,
            },
            sellerRating : {
                type : Number,
            }
        }
    ]
}));


////////////////////////////////////////////////////////////////////////////////////////////////////////////

// name , email , password , 
// Registration Form
app.get('/register',function(req,res){
    res.render('registration');
    console.log(req.body);

    const ujjwal = new user({
        name : 'Ujjwal',
        email : 'ujjwal@gmail.com',
        password : 'abc123',
        orders : ['112345678' , 'abc12345' , '11112dd121'],
    });

    // ujjwal.save(function(err,succ){
    //     if(!err && succ){
    //         console.log(succ);
    //     }
    // })
})


// //////////////////////ByDefaultLoginFormOpens////////////////////////////
app.get('/',async function(req,res){
    
    res.render('login');
    
    // const data = new item({
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
})

app.post('/login',function(req,res){
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    user.findOne({email : email , password : password}, '_id',function(err,accept){
        if(!err && accept){
            console.log("User Found");
            const userId = accept.id;
            // res.render('search/'+)
            // console.log(userId);
            res.render('search',{userId})
        }
    })

})



app.post('/regis',function(req,res){
    // console.log(req.body);
    // console.log(req.body.password);
    if(req.body.password[0]===req.body.password[1]){
        console.log("Password is Matched");
    }
    const newUser = new user({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password2,
        orders : [],
    });

    newUser.save(function(err , result){
        if(!err && result){
            console.log(result);
            console.log("Registration Successful");
            res.render('registrationSuccessful');
        }
    })
    // console.log(newUser);
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

app.post('/registerNew',function(req,res){
    res.render('registration')
})

//////////////////////////////////////////////////////////////////////
app.get('/search',function(req,res){
    const userId= req.params.id;
    // res.render('search',{userId})
    // console.log(req.body);
    console.log(req.params);
    // res.redirect(`/search?id=${userId}`);
})

//    Yha se Error ko dekho
app.post('/search',async function(req,res){
    // console.log(userId);
    // console.log(req.body);

    const getUserId = req.body.userId;

const myItem = req.body.searchItem;
   console.log(myItem);
   if(myItem!=null && myItem!=undefined){
        const getitem =  item.find({name: myItem},function(err,result){
            console.log(result);
            if(!err){
                if(result!=[] || result!=null || result!=undefined){
                    console.log(result);
                    res.render('buyer',{ItemName : myItem , getData : result , getUserId});
                }
                else{
                    res.render('productnotfound');
                }
            }
    });
   }
})
// app.post('/search',async function(req,res){
//    console.log(req.body.searchItem);
//    const myitem =  await item.findOne({name: req.body.searchItem});
//    console.log(myitem);
//      res.render('buyer',{getData : myitem});
// })

app.get('/seller',function(req,res){
    res.render('seller');
})

app.get('/addData',function(req,res){
    res.render('addData');
})

app.post('/updateData' , function(req,res){
    console.log(req.body);
    res.send('<h1>The Data has been received.</h1>');
    const newProduct = new item({
            name : req.body.productName,
            sellerName : req.body.sellerName,
            sellerID : req.body.sellerId,
            productDetails : req.body.productDetails,
            price : req.body.productPrice,
        })
        newProduct.save(function(err,accept){
            if(!err && accept){
                console.log(accept);
            }
        })
})

app.get('/buynow',function(req,res){
    res.render('buynow');
    console.log(req.body);
})


app.post('/:productId/:userId',async function(req,res){
    let getId = req.params.productId;
    getId = getId+"";

    let userId = req.params.userId;
    userId = userId+"";

    console.log("Product Id "+getId);
    console.log("User ID "+userId);


    const getData =item.findById(getId,function(err,result){
        console.log(result.name);
        console.log(result);
        res.render('buynow',{product : result , getId , userId})
    });
})

app.post('/order/:productId/:userId/:sellerID' , function(req,res){
    // res.send('<h1>Your Order is successful</h1>');
    let myproductID = req.params.productId+"";
    let mycustomerID = req.params.userId+"";
    let mysellerID = req.params.sellerID+"";

    // console.log("Product Id "+myproductID);
    // console.log("User ID "+mycustomerID);
    // console.log("Seller Id "+mysellerID);

    console.log(req.body);

    let address = req.body.address;
        address = address+"";
    let phonenumber = req.body.phonenumber;
        phonenumber = phonenumber+"";

    // const tempSeller = new seller({
    //     name : "Jagmohan",
    //     sellerId : "bnow001",
    // })

    // tempSeller.save(function(err,result){
    //     if(!err && result){
    //         console.log("Data Saved");
    //     }
    // });

    // Starting the Search operation for items Entry.


    seller.find({sellerId : mysellerID} , function(err,result){
        if(!err && result){
            console.log("Seller Found");
            console.log(result);
        }
        else{
            console.log("Seller Not found");
        }
    })
    const orderData = {
        productId : myproductID,
        customerId : mycustomerID,
        customerPhone : phonenumber,
        customerAddress : address,
    }
    console.log(orderData);


    let orders = [{
        orderId : myproductID,
        orderstatus : {
            atSellerHub : true,
            inTransit : false,
            usersHub : false,
            outofDelivery : false,
        }
    }
    ]
    
    // updating Users Order data
    user.findOneAndUpdate(
        { _id : mycustomerID }, 
        { $push: { userorders: orders } },
       function (error, success) {
             if (error || !success) {
                 console.log(error);
             } else {
                 console.log(success+"User Order Data Updated");
             }
         });
// -----------_---------_----------_--------------_---------------------
    seller.findOneAndUpdate(
        { sellerId : mysellerID }, 
        { $push: { orders: orderData  } },
       function (error, success) {
             if (error || !success) {
                 console.log(error);
             } else {
                 console.log(success+"Seller Data Updated");
                res.render('orderSuccess',{ myproductID , mysellerID });
             }
         });


    // console.log(req.body);
})

app.post('/review/:productId/:sellerId ',function(req,res){
    console.log("Reviews Accepteds");
    console.log(req.body);
    console.log(req.params);

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

})

// ---------------------Constructing-Seller-Login ----------------------
app.get('/sellerLogin',function(req,res){
        const tempSeller = new seller({
        name : "seller01",
        sellerId : "bnow001",
        password : 'bnow001',
        orders : [],
        sellerReview : [],
    })

    // tempSeller.save();
    res.render('sellerLogin');
})

app.post("/sellerlogin" , function(req,res){
    let sellerID = req.body.sellerId;
    let sellerPassword  = req.sellerPassword;
    seller.findOne({sellerId : sellerID} , function(err, success){
        if(!err && success){
            console.log(success);
            console.log("Seller Found");
            console.log(success.sellerId);
            res.render('sellerHome', {sellerID : success.sellerId});
        }
        else{
            res.send('<h1>Seller Not Found</h1>')
        }
    })
})

app.get('/sellerHome' , function(req,res){
    res.render('sellerHome');
    let sellerId = req.query;
        sellerId = sellerId+"";
    console.log(sellerId);

})

app.get('/updateOrder',function(req,res){
    console.log(req.query);
    let sellerID = req.query.id;
        sellerID = sellerID+"";
    console.log(sellerID);
    seller.findOne({sellerId : sellerID} ,  function(err,success){
        if(!err && success){
            console.log(success);
            res.render('updateOrder',{seller : success});
            // res.render('updateOrder');
        }
    })
})

// seller Homepage

// app.get('/mySellerLog',function(req,res){
//     console.log("Welcome to seller home");
//     res.render('mySellerLog')
// })



// get request for updating the transit status of the order 
app.get('/updateTransit',function(req,res){
    const sellerId = req.query.arg1;
     const productID= req.query.arg2;
     const customerID= req.query.arg3;
     console.log("sellerId "+sellerId);
     console.log("productId "+productID);
     console.log("customerId "+customerID);
     seller.find({sellerID : sellerId }, function(err , success){
        console.log(success);
     })
    res.render('updateTransit' , {customerID , productID})
})


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})



// Setting Up Tracking
app.get('/track',function(req,res){
    res.render('track');
})