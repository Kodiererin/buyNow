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

const item = mongoose.model('item',new mongoose.Schema({
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////


const buyer = mongoose.model('buyer',new mongoose.Schema({
    name : {
        type : String,
        uppercase : true,
    },
    cart : {
        type : String,
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

app.get('/register',function(req,res){
    res.render('registration');
})

app.get('/search',function(req,res){
    res.render('search')
})

//    Yha se Error ko dekho
app.post('/search',async function(req,res){
const myItem = req.body.searchItem;
   console.log(myItem);
   if(myItem!=null && myItem!=undefined){
        const getitem =  item.find({name: myItem},function(err,result){
            console.log(result);
            if(!err){
                if(result!=[] || result!=null || result!=undefined){
                    console.log(result);
                    res.render('buyer',{ItemName : myItem , getData : result});
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
})


app.post('/:id',async function(req,res){
    let getId = req.params.id;
    getId = getId+"";
    console.log(getId);
    const getData =item.findById(getId,function(err,result){
        console.log(result.name);
        console.log(result);
        res.render('buynow',{product : result})
    });
})


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})

