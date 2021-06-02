const db_config = require('./conn');
const connection = db_config.init();

exports.createMoim = (data, result) => {

    let sql1 = 'select * from moim where meeting_name = ?';

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
                    console.log(data.meeting_img);

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
                            let sql4 = 'select * from moim where meeting_name = ?';
                            let meeting_name = data.meeting_name;
                            connection.query(sql4, meeting_name, (err, results2, fields) => {
                                if (results) {
                                    let user_id = parseInt(data.moim_master);
                                    console.log(typeof(user_id));
                                    let sql5 = 'INSERT INTO moim_member (meeting_id, user_id) VALUES (?, ?)';
                                    let bind = [
                                        results2[0].meeting_id,
                                        user_id
                                    ]
                                    connection.query(sql5, bind, (err, results3, fields) => {
                                        if (err) {
                                            console.error('Error code : ' + err.code);
                                            console.error('Error Message : ' + err.message);
                                
                                            throw new Error(err);
                                        } else {
                                            if (results3) {
                                                result({
                                                    'state' : 200,
                                                    results
                                                });
                                            }
                                        }
                                    })
                                }
                            })
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
            // console.log(results[0]);
            if (results[0] == undefined){
                result({
                    'state' : 404,
                    'message' : '없는 모임입니다.'
                });
            } else {
                let sql = 'select count(*) as headcount from moim_member where meeting_id = ?';
                
                connection.query(sql, data, (err, results2, fields) => {
                    result({
                        'state' : 200,
                        'message' : "조회 성공",
                        'meeting' : results,
                        'headcount' : results2[0].headcount
                    });
                })
            }
            // result(JSON.parse(JSON.stringify(results)));
        }
    });
};

exports.editMoim = (data, result) => {
    
    let sql = 'select * from moim where meeting_id = ?';
    let meeting_id = data.meeting_id;

    let meeting_img = data.meeting_img;

    let sql2;

    connection.query(sql, meeting_id, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);
        } else {
                if (results){
                    if (results.meeting_img === meeting_img) {
                        sql2 = 'UPDATE moim SET meeting_name = ?, category = ?, meeting_time = ?, age_max = ?, age_min = ?, meeting_description = ?, meeting_recruitment = ?, meeting_location = ?, moim_master = ? WHERE meeting_id = ?';
                    } else {
                        sql2 = 'UPDATE moim SET meeting_name = ?, category = ?, meeting_time = ?, age_max = ?, age_min = ?, meeting_img = ?, meeting_description = ?, meeting_recruitment = ?, meeting_location = ?, moim_master = ? WHERE meeting_id = ?';
                    }

                    let bindInfo = [
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
                        data.meeting_id
                    ]

                    connection.query(sql2, bindInfo, (err, results, fields) => {
                        if (err) {
                            console.error('Error code : ' + err.code);
                            console.error('Error Message : ' + err.message);
                
                            throw new Error(err);
                        } else {
                            result({
                                'state' : 200,
                                'message' : '수정 성공',
                            })
                        }
                    });
                }
        }
    })
}

exports.deleteMoim = (data, result) => {
    
    let sql = 'delete from moim where meeting_id = ?';

    connection.query(sql, data, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);

            throw new Error(err);
        } else {
            result({
                'state' : 200,
                'message' : '삭제 성공',
            });
        }
    });
}

exports.participateMoim = (data, result) => {

    let sql1 = 'select * from moim_member where meeting_id = ? and user_id = ?'

    let sql2 = 'insert into moim_member (meeting_id, user_id) value (?, ?)';

    let bind = [
        data.meeting_id,
        data.user_id
    ]

    connection.query(sql1, bind, (err, results, fields) => {
        if (results[0] === undefined) {
            connection.query(sql2, bind, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error message : ' + err.message);
        
                    throw new Error (err);
                } else {
                    if (results.affectedRows === 1) {
                        result({
                            'state' : 200,
                            'message' : '참여 성공'
                        });
                    } else {
                        result({
                            'state' : 404,
                            'message' : '참여 실패'
                        })
                    }
                }
            });
        } else {
            result({
                'state' : 405,
                'message' : '이미 참여된 모임'
            })
        }
    });
}

exports.withdrawMoim = (data, result) => {
    let sql1 = 'select * from moim_member where meeting_id = ? and user_id = ?';
    let sql2 = 'delete from moim_member where meeting_id = ? and user_id = ?';

    let bind = [
        data.meeting_id,
        data.user_id
    ];

    connection.query(sql1, bind, (err, results1, fields) => {
        if (results1[0] === undefined) {
            result({
                'state' : 404,
                'message' : '가입하지 않은 모임은 탈퇴할 수 없습니다.'
            });
        } else {
            connection.query(sql2, bind, (err, results2, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error message : ' + err.message);
        
                    throw new Error (err);
                } else if (results2.affectedRows === 1) {
                    result({
                        'state' : 200,
                        'message' : '탈퇴 성공'
                    });
                } else {
                    result({
                        'state' : 404,
                        'message' : '알 수 없는 에러'
                    });
                }
            });
        }
    });
}