

import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// editable


const app = express() 
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
//for cookies
app.use(cookieParser());

//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});


mongoose.connect("mongodb://localhost:27017/borderFreeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {    
    console.log("DB connected")
})


const userSchema = new mongoose.Schema({
    quantity:String,
    prices:String,
    colors:String
})

//new one

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}

//end of new one

const User = new mongoose.model("User", userSchema)



//Routes


app.post("/detail", (req, res)=> {
    console.log(req);
    const {quantity,prices,colors} = req.body
    User.findOne({colors: colors}, (err, user) => {
        if(user){
          
        } else {
            const user = new User({
                quantity,
                prices,
                colors
                
            })
        
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                   
                }
            })
        }
    })
}) 

app.listen(9003,() => {
    console.log("BE started at port 9003")
})
