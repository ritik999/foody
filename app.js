const express=require("express");
const ejs=require("ejs");

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res) {
    res.render("food");
});

app.listen(3000,function() {
    console.log("the app is running on port 3000");
})