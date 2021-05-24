const db_config = require('./conn');
const connection = db_config.init();

exports.createMoim = (data, result) => {

    let sql1 = 'select * from moim where meeting_name = ?';

    // let bindTitle = {"meeting_name" : data.meeting_name}; // 이렇게 하면 안됨. results가 undefined or [] 로 아무것도 못 받아옴.
    let bindTitle = data.meeting_name;

    console.log(data.meeting_name);

    connection.query(sql1, bindTitle, (err, results, fields) => {

        console.log(results);
        console.log(data.meeting_name);

        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);

        } else if (results[0]){
            if (results[0].meeting_name == data.meeting_name) {

                console.error('Error Message : 중복된 모임명입니다.');
                result({
                    'state':404,
                    'message':'중복된 모임명입니다.'
                });
            }
        } else {
            let now = new Date();
            // 입력구문
            let sql2 = 'INSERT INTO moim (meeting_name, category, meeting_time, age_max, age_min, meeting_img, meeting_description, meeting_recruitment, meeting_location, head_count, moim_master) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            let bindParam = [
                data.meeting_name,
                data.category,
                data.meeting_time,
                data.age_max,
                data.age_min,
                data.meeting_img,
                data.meeting_description,
                data.meeting_recruitment,
                data.meeting_location,
                1,
                data.moim_master,
            ];

            connection.query(sql2, bindParam, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error Message : ' + err.message);
        
                    throw new Error(err);
                } else {
                    result({
                        'state' : 200,
                        results
                    })
                    // result(JSON.parse(JSON.stringify(results)));
                }
            });
        }
    });
};

exports.showDetailMoim = (data, result) => {
    let sql = 'SELECT * FROM moim WHERE meeting_id = ? ';
    let bindParam = data;

    connection.query(sql, bindParam, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);
        } else {
            result({
                'state' : 200,
                'message' : "조회 성공",
                'meeting' : results
            })
            // result(JSON.parse(JSON.stringify(results)));
        }
    });
};

// 여기 밑으로는 암것도 아님.

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