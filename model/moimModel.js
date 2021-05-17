const db_config = require('./conn');
const connection = db_config.init();

exports.createMoim = (data, result) => {
    let now = new Date();
    // 입력구문
    let sql = 'INSERT INTO moim (meeting_name, category, meeting_time, age_max, age_min, meeting_img, meeting_description, meeting_location, moim_master) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let bindParam = [
        data.meeting_name,
        data.category,
        data.meeting_time,
        data.age_max,
        data.age_min,
        data.meeting_img,
        data.meeting_description,
        data.meeting_location,
        data.moim_master,
    ];

    connection.query(sql, bindParam, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);
        } else {
            result(JSON.parse(JSON.stringify(results)));
        }
    });
    
};

exports.showDetailMoim = (data, result) => {
    let sql = 'SELECT * FROM moim WHERE meeting_id = ? ';
    let bindParam = [data.meeting_id];

    connection.query(sql, bindParam, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);
        } else {
            result(JSON.parse(JSON.stringify(results)));
        }
    });
};

// exports.testMoim = (result) => {
//     let sql = 'SELECT * FROM user WHERE user_email';
//     connection.query(sql, (err, results, fields) => {
//         if (err) {
//             console.error('Error code : ' + err.code);
//             console.error('Error Message : ' + err.message);

//             throw new Error(err);
//         } else {
//             result(JSON.parse(JSON.stringify(results)));
//         }
//     });
// }