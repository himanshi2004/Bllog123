const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileUpload');
const  cloudinary = require('cloudinary');


//flash
const  flash = require('connect-flash');
app.use(flash());

// for flash message session
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))

// Body-parser middleware
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


//cookies
const cookieParser  =  require('cookie-parser')
app.use(cookieParser())
//for fil upload
app.use(fileUpload({useTempFiles:true}));
app.use('/',web)


app.set('view engine','ejs')
//use for static files

app.use(express.static('public'))





connectDB();

app.listen(port,()=>{
    console.log("server is running at localhost 3000 ")
})