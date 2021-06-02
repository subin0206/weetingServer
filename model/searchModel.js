const db_config = require('./conn');
const connection = db_config.init();

exports.searchMoim = (data, result) => {

    let searchWord = '%' + data.searchWord + '%';
    let location = '%' + data.location + '%';

    if (data.searchWord != null) { // searchWord가 있을 때
        if (data.location != null) { // 둘 다 있을 때
            let sql = 'select * from moim where meeting_name like ? and meeting_location like ?';
            let bind = [
                searchWord,
                location,
                
            ];
            connection.query(sql, bind, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error message : ' + err.message);

                    throw new Error(err);
                } else {
                    if (results[0] == undefined) {
                        result({
                            'state' : 405,
                            'message' : '결과가 없습니다.'
                        });
                    } else {
                        result({
                            'state' : 200,
                            'message' : '검색어와 주소로 검색되었습니다.',
                            'result' : results
                        })
                    }
                }
            });
        } else { // searchWord만 있을 때
            let sql = 'select * from moim where meeting_name like ?';
            connection.query(sql, searchWord, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error message : ' + err.message);

                    throw new Error(err);
                } else {
                    if (results[0] == undefined) {
                        result({
                            'state' : 405,
                            'message' : '결과가 없습니다.'
                        });
                    } else {
                        result({
                            'state' : 200,
                            'message' : '검색어로 검색되었습니다.',
                            'result' : results
                        });
                    }
                }
            });
        }
    } else { // searchWord가 없을 때
        if (data.location != null) { // location만 있을 때
            let sql = 'select * from moim where meeting_location like ?';
            connection.query(sql, location, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error message : ' + err.message);

                    throw new Error(err);
                } else {
                    if (results[0] == undefined) {
                        result({
                            'state' : 405,
                            'message' : '결과가 없습니다.'
                        });
                    } else {
                        result({
                            'state' : 200,
                            'message' : '주소로 검색되었습니다.',
                            'result' : results
                        });
                    }
                }
            });
        } else { // 아무것도 안 들어왔을 때
            result({
                'state' : 404,
                'message' : '검색어 혹은 주소를 입력하세요.'
            })
        }
    }
}