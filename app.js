const express = require("express");
const path = require("path"); 

const app = express();
const port = 80;

//mongo stuff
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDA', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    user: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get("/contact", (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your response has been recorded. Thanks for joining us.")
    }).catch(()=>{
        res.status(400).send("Sorry!!! Something went wrong.")
    })
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});