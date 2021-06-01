const userModel = require('../model/userModel');
// console.log("connect router");
const nodemailer = require('nodemailer');

function randomToken(){
    var token = '';
    token = Math.random().toString(36).substr(2,11); // "twozs5xfni"
    return token;
}
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

exports.authEmail = (req, res, next) =>{

    let email = req.body.email;
    console.log(email);
    var token = randomToken();
    let smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: "2149ksb@gmail.com",
        to: email,
        subject: "Weeting 가입 인증",
        html: '<p>안녕하세요.<br>여성들의 안전한 취미 공유 서비스 "위팅"입니다.<br>아래의 인증번호를 입력해 이메일 인증을 완료해주세요 !</p><br><br>' +
          "<b>인증번호: "+token+"</b>"

      };
      
    console.log(token);
    smtpTransport.sendMail(mailOptions, (error, responses) =>{
        if(error){
            console.log(error.console);
            res.json({
                'state': 400,
                'message':'이메일 발신 실패'
                });
        }else{
            res.json({
                'state': 200,
                'token': token,
                'message':'이메일 발신 성공'
                });
          
        }
        smtpTransport.close();
    });
};
exports.joinUser = (req, res) =>{
    let item = {
        'email': req.body.email,
        'age': req.body.age,
        'name': req.body.name,
        'interests' : req.body.interests,
        'description' : req.body.description,
        'password' : req.body.password
    };
    userModel.insertUser(item, result => {
        if(result.affectedRows === 1) {
            res.json({
                'state': 200,
                'message':'회원가입 성공'
            });
        }
        else if (result.state == 404) {
            res.json({
                'state' : 404,
                'message' : 'null 값이 존재합니다.'
            })
        }
        else{
            res.json({
                'state': 400,
                'message':'회원가입 실패'
                });
        }
    });        

};
exports.main = (req, res) => {
    console.log("잘 되니");
    res.send('respond with a resource');
}