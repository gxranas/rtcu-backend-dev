const router = require('express').Router();
const Connection = require('../config/Connection');
require('dotenv').config();

router.post('/add', (req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const mobile = req.body.email;
    const note = req.body.email;
    const address = req.body.email;
    const province = req.body.email;
    const city = req.body.email;
    const barangay = req.body.email;
    const type = req.body.email;
    const status = req.body.status;

    const queryAdd = "INSERT INTO Addresses ( userEmail, addressFullname, addressMobile, addressNote, addressAddress, addressProvince, addressCity, addressBarangay, addressType, addressStatus) VALUES (?,?,?,?,?,?,?,?,?,?)"
    try
    {
       Connection.query(queryAdd, [email,name,mobile,note,address,province,city,barangay,type,status], (err,result)=>{
        res.send(result);
       })
    }catch(error){
        console.log(error);
    }
})


router.post('/address', (req,res)=>{
    const email = req.body.email;
    const select = "SELECT * FROM Addresses WHERE userEmail=?";
    try
    {
        Connection.query(select,[email], (err,result)=>{
            res.send(result);
        })
    }catch(error){

    }
})


module.exports = router