// mysql 연결 
const db_config = require('../model/conn');
const connection = db_config.init();
const bcrypt = require('bcrypt'); 
const saltRound = 10;

exports.selectEmail = (data, result) => {
    let sql = 'select user_id from user where email = ?';
    // let bindParam = [data.email];
    connection.query(sql, [data.email], (err, results, fields) => { 
       console.log(data.email, "Data.email");
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            throw new Error(err); 
        } 
            else { 
                result(JSON.parse(JSON.stringify(results)));
                console.log(results);
            } 
        });
};

exports.selectUser = (data, result) => {
    let sql = 'select * from user where email = ?';
    connection.query(sql, data, (err, results, fields)=>{
        console.log(data, "data.email");
        console.log(results[0],"resuls");
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            throw new Error(err); 
        } 
            else { 
                result(JSON.parse(JSON.stringify(results)));
                // result(results[0]);
                console.log(results[0]);
            } 
        });
};
exports.selectUserInfo = (data, result) => {
    let sql = 'select * from user where email = ?';
    connection.query(sql, data.email, (err, results, fields)=>{
        console.log(data, "data.email");
        console.log(results[0],"resuls");
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            throw new Error(err); 
        } 
            else { 
                result(JSON.parse(JSON.stringify(results)));
                // result(results[0]);
                console.log(results[0]);
            } 
        });
};
exports.insertImg = (data, result) =>{
    let sql = 'update user set profile_img = ? where email = ?';
    console.log(data, 'data');
    let bindParam = [data.profile_img, data.email];
    connection.query(sql, bindParam, (err, results, fields)=>{
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            if(err.message.length > 0){
                result({
                    "state": 300,
                    "message": err.message
                });
            }

        } 
            else { 
                result(JSON.parse(JSON.stringify(results)));
            } 
    });
};
exports.insertUser = (data, result) => {
    bcrypt.genSalt(saltRound, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(data.pwd, salt, (err, hash) => {
            if (err) return next(err);
        console.log(result);

        let sql = 'insert into user (email, age, name, interests, description, pwd) values(?,?,?,?,?,?)';
        let bindParam = [ 
            data.email,
            data.age,
            data.name,
            data.interests,
            data.description,
            hash
        ];
        console.log(data, "data");
        connection.query(sql,bindParam, (err, results, fields) => { 
            if (err) { 
                console.error('Error code : ' + err.code); 
                console.error('Error Message : ' + err.message); 
                if(err.message.length > 0){
                    result({
                        "state": 300,
                        "message": err.message
                    });
                }

            } 
                else { 
                    result(JSON.parse(JSON.stringify(results)));
                } 
            });
        });
    });
    
};


