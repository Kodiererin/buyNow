const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');               //EJS

// Mongoose Instialisation
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/items',{useNewUrlParser : true});  
    console.log("Database Connected");
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/loginBuyNow',{useNewUrlParser : true});  
      console.log("Database Connected");
  }
mongoose.set('strictQuery', false);

const itemsSchema = new mongoose.Schema({
    name : {
        type : String,
        uppercase : true, 
        required : true,
    },
    productDetails : {
        type : String,
    },
    reviews : {
        type : Array,
        default : [],
    },
    price : {
        type : Number,
        minimum : 0,
        required : true,
    },
    sellerName : {
        type : String,
        boolean : true,
    },
    sellerUrl : {
        type : String,
        required : true,
    }
});

const loginSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    }

})

const Item = new mongoose.model('Item',itemsSchema);
const 


app.get('/',function(req,res){
    
})


app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})

