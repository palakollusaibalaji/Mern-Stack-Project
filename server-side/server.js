const express = require('express');
const mongoose  = require('mongoose');
const Routes = require("./routes/user");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors")

mongoose.connect('mongodb://127.0.0.1:27017/minorproject',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongosh connected');
}).catch((err)=>{
    console.log('mongodb is not connected',err);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Important for cookies
}));

app.use('/Home',Routes);


app.listen(4000,() => {
    console.log('server stated at 4000')
})

