// Require Express
const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static (path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));



// Require Mongoose

const mongoose = require("mongoose");

main()
.then(() => {
    console.log("Connection Established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.listen(port, () =>{
    console.log(`App is Listening to port no ${port}`);
});

app.get("/", async (req,res) =>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats})
});


//Require models

const Chat= require("./models/chats.js");


// index route : show all chats

app.get("/chats", async (req,res) =>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats})
})

// getting onto Create New Chat page

app.get("/chats/new", (req,res) =>{
    res.render("new.ejs");
})

// submitting new post

app.post("/chats", (req,res) =>{
    let {from , to, msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    });
    console.log(newChat);
    newChat.save();
    res.redirect("/chats");
})

//Getting to the edit page

app.get("/chats/:id/edit" , async(req,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit",{chat});
})

// Chats are edited

app.put("/chats/:id",async(req,res) =>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg : newMsg},
        {runValidators : true , new : true}
    ); 
    res.redirect("/chats");
});

//Destroy Chat

app.delete("/chats/:id" , async (req,res) =>{
    try{
        let {id} = req.params;
    let delChat = await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
    }catch(e){
        console.log(e)
    }
    
})