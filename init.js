// Require Mongoose

const mongoose = require("mongoose");

//Require models

const Chat= require("./models/chats.js");

main()
.then(() => {
    console.log("Connection Established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let userChats = [
    {
        from : "alex",
        to : "mathew",
        msg : "Hey! Have you prepared well for the exams??",
        created_at : new Date()
    },
    {
        from : "rohit",
        to : "mohit",
        msg : "teach me JS callbacks",
        created_at : new Date()
    },
    {
        from : "paul",
        to : "annie",
        msg : "Let's Catch Up!",
        created_at : new Date()
    },
    {
        from : "daisy",
        to : "donald",
        msg : "How about having a coffee together?",
        created_at : new Date()
    },
    
];

Chat.insertMany(userChats);

