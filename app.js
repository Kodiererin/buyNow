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
    orders : {
        type : Array,
        default : [],
    }
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
        }
    ],
    sellerReview : [{type : String}],
}));


// Setting a temporary seller





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
    console.log(req.body);
    console.log(req.body.password);
    if(req.body.password[0]===req.body.password[1]){
        console.log("Password is Matched");
    }
})

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
    res.send('<h1>Your Order is successful</h1>');
    let myproductID = req.params.productId+"";
    let mycustomerID = req.params.userId+"";
    let mysellerID = req.params.sellerID+"";

    console.log("Product Id "+myproductID);
    console.log("User ID "+mycustomerID);
    console.log("Seller Id "+mysellerID);


    const tempSeller = new seller({
        name : "Jagmohan",
        sellerId : "bnow001",
    })

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
    }
    console.log(orderData);

    seller.findOneAndUpdate(
        { sellerId : mysellerID }, 
        { $push: { orders: orderData  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success+"Seller Data Updated");
             }
         });


    console.log(req.body);


})


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})



// Setting Up Tracking
app.get('/track',function(req,res){
    res.render('track');
})