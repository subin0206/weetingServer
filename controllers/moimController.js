const moimModel = require('../model/moimModel');

exports.createMoim = (req, res) => {

    var meeting_img = req.file == undefined ? null : req.file.location;

    if (req.body.age_min > req.body.age_max) {
        res.json({
            'state' : 403,
            'message' : '최소 나이가 최대 나이보다 많습니다.'
        })
    } else {

        let meetingInfo = {
            'meeting_name' : req.body.meeting_name,
            'category' : req.body.category,
            'meeting_time' : req.body.meeting_time,
            'age_max' : req.body.age_max,
            'age_min' : req.body.age_min,
            'meeting_img' : meeting_img,
            'meeting_description' : req.body.meeting_description,
            'meeting_recruitment' : req.body.meeting_recruitment,
            'meeting_location' : req.body.meeting_location,
            'moim_master' : req.body.moim_master,
        };
    
        moimModel.createMoim(meetingInfo, (result) => {
            if (result) {
                if (result.state === 200) {
                    res.json({
                        'state': 200,
                        'message':'생성 성공' 
                        });
                    console.log("1");
                } else if (result.state === 404) {
                    res.json({
                        'state' : 404,
                        'message' : '중복된 모임명'
                    })
                    console.log("2");
                } else if (result.state === 405) {
                    res.json({
                        'state' : 405,
                        'message' : '카테고리 없음'
                    })
                } else if (result.state === 406) {
                    res.json({
                        'state' : 406,
                        'message' : '모임 시간을 현재 이후로 설정해주세요.'
                    })
                } else if (result.state === 407) {
                    res.json({
                        'state' : result.state,
                        'message' : result.message
                    })

                } else {
                    res.json({
                        'state': 400,
                        'message':'서버 에러'
                        });
                    console.log("3");
                }
            }
        });
    }
}

exports.showDetailMoim = (req, res) => {

    let meeting_id = req.params.meeting_id;

    // let meeting_id = req.body.meeting_id;

    moimModel.showDetailMoim(meeting_id, (meeting) => {
        if (meeting) {
            if (meeting.state === 200) {
                console.log("들어오나?");
                res.json({
                    'state' : 200,
                    'message' : '조회 성공',
                    'meeting' : meeting,
                    'is_member' : 'dsafa'
                });
            }
        }
        else {
            res.json({
                'state' : 500,
                'message' : '조회 실패',
                'is_member' : 'dsafa'
            });
        }
    })
}

// exports.testMoim = (req, res) => {
//     // moimModel.testMoim((result) => {};
//     moimModel.testMoim((result) => {
//         if (result) {
//             res.json(result);
//         }
//     });
// }