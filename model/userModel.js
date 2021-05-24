// mysql 연결 
const db_config = require('../model/conn');
const connection = db_config.init();
const bcrypt = require('bcrypt'); 
const saltRound = 10;

exports.selectEmail = (data, result) => {
    let sql = 'select user_id from user where email = ?';
    // let bindParam = [data.email];
    connection.query(sql, [data.email], (err, results, fields) => { 
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            throw new Error(err); 
        } 
            else { 
                result(JSON.parse(JSON.stringify(results)));
                console.log(results[0]);
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
                throw new Error(err.message); 
            } 
                else { 
                  result({
                      'state':200
                  })                      
                } 
            });
        });
    });
};


