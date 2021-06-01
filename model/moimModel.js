const db_config = require('./conn');
const connection = db_config.init();

exports.createMoim = (data, result) => {

    let sql1 = 'select * from moim where meeting_name = ?';

    // let bindTitle = {"meeting_name" : data.meeting_name}; // 이렇게 하면 안됨. results가 undefined or [] 로 아무것도 못 받아옴.
    let bindTitle = data.meeting_name;

    // console.log(data.meeting_name);

    connection.query(sql1, bindTitle, (err, results, fields) => {

        // 변환

        let now = new Date();
        // let year = now.getFullYear();
        // let month = now.getMonth() + 1;
        // month = month >= 10 ? month : '0' + month;
        // let day = now.getDate();
        // day = day >= 10 ? day : '0' + day;
        // let hour = now.getHours();
        // hour = hour >= 10 ? hour : '0' + hour
        // let min = now.getMinutes();
        // let sec = now.getSeconds();
        // sec = sec >= 10 ? sec : '0' + sec

        // let nowDate = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
        // let nowDate = year + '-' + month + '-' + day + ' ' + hour + ':' + min

        // 변환 끝

        let meeting_time2 = data.meeting_time;

        var year = meeting_time2.substring(0, 4);
        var month = meeting_time2.substring(5, 7);
        month = month - 1;
        var day = meeting_time2.substring(8, 10);
        var hour = meeting_time2.substring(11, 13);
        var minute = meeting_time2.substring(14, 16);
        var second = meeting_time2.substring(17, 19);

        meeting_time2 = new Date(year, month, day, hour, minute, second);

        console.log(now);
        console.log(meeting_time2);

        // console.log(results);
        // console.log(data.meeting_name);

        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);

        } else if (results[0]) {
            if (results[0].meeting_name == data.meeting_name) {

                console.error('Error Message : 중복된 모임명입니다.');
                result({
                    'state':404,
                    'message':'중복된 모임명입니다.'
                });
            } else if (data.meeting_time < now) {
                result({
                    'state':406,
                    'message':'모임 시간을 현재 이후로 설정하세요.'
                });
            }

        } else {

            let sql3 = 'SELECT COUNT(*) as category_num FROM category_name';

            connection.query(sql3, (err, results, fields) => {
                // console.log(typeof(results[0].category_num));
                // console.log(typeof(data.category));

                if (results[0].category_num < data.category){

                    console.error('존재하는 카테고리가 없습니다.');
                    result({
                        'state' : 405,
                        'message' : '존재하는 카테고리가 없습니다.'
                    });

                } else if (now > meeting_time2) {

                    result({
                        'state' : 407,
                        'message' : '시간을 현재시간 이후로 입력하세요.'
                    })

                } else {
                    // 입력구문
                    let sql2 = 'INSERT INTO moim (meeting_name, category, meeting_time, age_max, age_min, meeting_img, meeting_description, meeting_recruitment, meeting_location, moim_master) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
                    console.log(data.meeting_time);

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