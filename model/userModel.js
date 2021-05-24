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
exports.selectEmail = (email, result) => {
    let sql = 'select email from user where email = ?';

    // param = result + "";

    // console.log(param + "111");

    console.log([email]);

    connection.query(sql, [email.email], (err, results, fields) => { 
        console.log(result);
        if (err) { 
            console.error('Error code : ' + err.code); 
            console.error('Error Message : ' + err.message); 
            throw new Error(err); 
        } 
            else { 
                // results2 = results[0];
                // console.log(results2 + "333");
                result(JSON.parse(JSON.stringify(results)));
            } 
        });
};


