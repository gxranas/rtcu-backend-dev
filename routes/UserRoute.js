const router = require('express').Router();
const Connection = require('../config/Connection');
require('dotenv').config();
const passport = require('passport');
const currentDate = new Date();
const days = currentDate.getDate();
const month = currentDate.getMonth() + 1;  
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();
const DateNowString = year + '-' + month + '-' + days + ' ' + hour + ':' + minute + ':' + second;

router.post('/information', (req,res)=>{
    const email = req.body.email;
    const select = "SELECT * FROM Users WHERE userEmail=?";
    try
    {
        Connection.query(select,[email], (err,result)=>{
            res.send(result);
        })
    }catch(error){

    }
})


router.post('/login', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const selectUser = "SELECT * FROM Users WHERE userEmail=? AND userPassword=?"

    try
    {
        Connection.query(selectUser, [email,password] , (err, result)=>{
            req.session.user = result
            res.send(result);
        })
    }
    catch(error)
    {
        
    }
})

router.post('/signup', (req,res)=>{
    const fullname = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const findExistEmail = "SELECT COUNT(*) AS IsExist FROM Users WHERE userEmail = ?";
    const insertUser = "INSERT INTO Users (userGoogleId, userFullname, userEmail, userPassword, userStatus, userVerification, userDateCreated) Values (0,?,?,?,1,0,?)"
    try
    {
        Connection.query(findExistEmail,[email], (err,result)=>{
            if(result[0].IsExist === 1)
            {
             return res.status(400).json({
                    msg: "Invalid email"
                });
            }
            else
            {
                try
                {
                Connection.query(insertUser, [fullname,email,password,DateNowString], (err,result)=>{
                    if(err) 
                    {
                       console.log(err);
                    }
                    else 
                    {
                        res.send(result);
                    }
                    })
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        })
    }
    catch(error)
    {
        console.log(error);
    }
})

router.get("/login/success", (req,res)=>{
    if(req.user){
    res.status(200).json({
        success:true,
        message:"Login Successful",
        user: req.user,
        cookies: req.cookies,
    });
    }
});

router.get("/logout", (req,res) =>{
    req.logout();
    res.redirect(String(process.env.CLIENT_URL));
});


router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        success:false,
        message:"Login Failed",
    });
});

router.get("/google",passport.authenticate("google", {scope: ["profile","email"]}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: String(process.env.CLIENT_URL),
    failureRedirect: "/login/failed"
}))


router.get("/facebook",passport.authenticate("facebook", {scope: ["profile","email"]}));

router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: String(process.env.CLIENT_URL),
    failureRedirect: "/login/failed"
}))


router.put("/update/name", (req,res)=>{
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const fullname = firstname + ' ' + lastname;
    const queryUpdate = "UPDATE Users SET userFullname=? WHERE userEmail=?";
    try{
      Connection.query(queryUpdate,[fullname,email], (err,result)=>{
        res.send(result);
      })
    }
    catch(error){
        console.log(error);
    }
})

router.put("/update/birthday", (req,res)=>{
    const email = req.body.email;
    const birthday = req.body.birthday;
    const queryUpdate = "UPDATE Users SET userBirthday=? WHERE userEmail=?";
    try{
      Connection.query(queryUpdate,[birthday,email], (err,result)=>{
        res.send(result);
        console.log(result);
      })
    }
    catch(error){
        console.log(error);
    }
})

router.put("/update/email", (req,res)=>{
    const email = req.body.email;
    const newemail = req.body.newemail;
    const queryUpdate = "UPDATE Users SET userEmail=? WHERE userEmail=?";
    const findExistEmail = "SELECT COUNT(*) AS IsExist FROM Users WHERE userEmail = ?";
    
    try{
        Connection.query(findExistEmail,[newemail], (err,result)=>{
            if(result[0].IsExist === 1)
            {
             return res.status(400).json({
                    msg: "Invalid email"
                });
            }
            else
            {
                try
                {
                    try{
                        Connection.query(queryUpdate,[newemail,email], (err,result)=>{
                          res.send(result);
                        })
                      }
                      catch(error){
                          console.log(error);
                      }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        })
    }catch(error){

    }
})

router.put("/update/gender", (req,res)=>{
    const email = req.body.email;
    const gender = req.body.gender;
    const queryUpdate = "UPDATE Users SET userGender=? WHERE userEmail=?";
    try{
      Connection.query(queryUpdate,[gender,email], (err,result)=>{
        res.send(result);
      })
    }
    catch(error){
        console.log(error);
    }
})

router.put("/update/password", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const queryUpdate = "UPDATE Users SET userPassword=? WHERE userEmail=?";
    try{
      Connection.query(queryUpdate,[password,email], (err,result)=>{
        res.send(result);
      })
    }
    catch(error){
        console.log(error);
    }
})

router.put("/update/phone", (req,res)=>{
    const email = req.body.email;
    const phone = req.body.phone;
    const queryUpdate = "UPDATE Users SET userPhone=? WHERE userEmail=?";
    try{
      Connection.query(queryUpdate,[phone,email], (err,result)=>{
        res.send(result);
      })
    }
    catch(error){
        console.log(error);
    }
})


module.exports = router