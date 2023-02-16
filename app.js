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
    sellerUrl : {
        type : String,
        required : true,
    },
    productDetails : {
        type : String,
    },
    reviews : {
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

app.get('/',async function(req,res){    
    const data = new item({
        name : 'Pen',
        innerItem :[{
            productDetails : 'Blue Colour Pen',
            reviews :['Great Ink' , 'Good Milege'],
            price : 21.99,
            sellerName : 'XYZSeller',
            sellerUrl : 'www.seller.com'
        },
        {
            productDetails : 'Red Colour Pen',
            reviews :['Great Ink' , 'Good Milege'],
            price : 25.99,
            sellerName : 'XYZSeller',
            sellerUrl : 'www.seller.com'
        },
        {
            productDetails : 'Black Colour Pen',
            reviews :['Great Ink' , 'Good Milege'],
            price : 19.99,
            sellerName : 'XYZSeller',
            sellerUrl : 'www.seller.com'
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


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})

