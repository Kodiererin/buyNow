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
mongoose.set('strictQuery', false);

const itemSchema = new mongoose.Schema({
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
});

const item = mongoose.model('item',new mongoose.Schema({
    name : {
        type : String,
    },
    innerItem : [itemSchema],
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const seller = mongoose.model('seller',new mongoose.Schema({
    name : {
        type : String,
    },
    purchases : {
        type : String,
    }
}))

const buyer = mongoose.model('buyer',new mongoose.Schema({
    name : {
        type : String,
    },
    cart : {
        type : String,
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/',async function(req,res){    
    const data = new item({
        name : 'Pen',
        innerItem :[{
            productDetails : 'Blue Colour Pen',
            productreviews :['Great Ink' , 'Good Milege'],
            sellerreviews :['Delivery On time' , 'Great Pricing'],
            price : 21.99,
            sellerName : 'GadaStationary',
            sellerID : 'bnow01'
            
        },
        {
            productDetails : 'Red Colour Pen',
            productreviews :['Great Ink' , 'Good Milege'],
            sellerreviews :['Delivery On time' , 'Great Pricing'],
            price : 21.99,
            price : 25.99,
            sellerName : 'ElephantStationary',
            sellerID : 'bnow02'
        },
        {
            productDetails : 'Black Colour Pen',
            productreviews :['Great Ink' , 'Good Milege'],
            sellerreviews :['Delivery On time' , 'Great Pricing'],
            price : 21.99,
            price : 19.99,
            sellerName : 'ABC Stationary',
            sellerID : 'bnow03'
        }]
    })

    // data.save(function(err,succ){
    //     if(!err && succ){
    //         console.log("Data Has Been Saved Successfully");
    //     }
    // });

    const myData = item.find({name : 'Pen'},function(err,getData){
        console.log(getData);
        res.render('buyer',{getData : getData})
    });
})

app.get('/search',function(req,res){
    res.render('search')
})


app.post('/search',async function(req,res){
const myItem = req.body.searchItem;
   console.log(myItem);
   if(myItem!=null && myItem!=undefined){
        const myitem =  item.findOne({name: myItem},function(err,result){
            console.log(result);
            if(!err){
                if(result){
                    console.log(result);
                    res.render('buyer',{getData : result});
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




app.post('/buynow/:id' , function(req,res){
    console.log(req.params);
    item.findOne({name : req.params._id},function(err,result){
        if(!err && result){
            console.log(result);
        }
        
    });

})

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
        innerItem : {
            sellerName : req.body.sellerName,
            sellerID : req.body.sellerId,
            productDetails : req.body.productDetails,
            price : req.body.productPrice,
        }})
        newProduct.save(function(err,accept){
            if(!err && accept){
                console.log(accept);
            }
        })
})


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})

