// mysql 연결 
const db_config = require('../model/conn');
const connection = db_config.init();

// exports.selectId = (results, id) =>{
//     let sql = 'select * from user where user_id = ?';
//     let bindParm = [results.user_id];

//     connection.query(sql, bindParam, (err, results, fields) => { 
//         if (err) { 
//             console.error('Error code : ' + err.code); 
//             console.error('Error Message : ' + err.message); 
//             throw new Error(err); 
//         } 
//             else { 
//                 results(JSON.parse(JSON.stringify(results))); 
//             } 
//         });
// };
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

