const userModel = require('../model/userModel');
console.log("connect router");

exports.getEmail = (req, res)=>{
    console.log("connect router2");
    let email = {'email':req.body.email};
    console.log('email', email);
    userModel.selectEmail(email, (result)=>{
        if(
            // result.RowsAffected === 1
            result.length == 0
            ){
            res.json({
                'state': 200,
                'message':'email 중복 아님'
                });
        }
        else{
            res.json({
                'state': 300,
                'message':'email 중복'
                });
        }
        console.log(email);
    });
};

exports.main = (req, res) => {
    console.log("잘 되니");
    res.send('respond with a resource');
}