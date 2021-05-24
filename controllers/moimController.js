const moimModel = require('../model/moimModel');

exports.createMoim = (req, res) => {
    let meetingInfo = {
        'meeting_name' : req.body.meeting_name,
        'category' : req.body.category,
        'meeting_time' : req.body.meeting_time,
        'age_max' : req.body.age_max,
        'age_min' : req.body.age_min,
        'meeting_img' : req.body.meeting_img,
        'meeting_description' : req.body.meeting_description,
        'meeting_recruitment' : req.body.meeting_recruitment,
        'meeting_location' : req.body.meeting_location,
        'moim_master' : req.body.moim_master,
    };

    moimModel.createMoim(meetingInfo, (result) => {
        if (result) {
            if (result.affectedRows === 1) {
                res.json({
                    'state': 200,
                    'message':'생성 성공'
                    });
            } else {
                res.json({
                    'state': 400,
                    'message':'서버 에러'
                    });
            }
        }
    });
}

exports.showDetailMoim = (req, res) => {
    let meeting_id = req.body.meeting_id;

    moimModel.showDetailMoim(meeting_id, (meeting) => {
        if (meeting) {
            if (meeting.affectedRows === 1) {
                res.json({
                    'state' : 200,
                    'message' : '조회 성공',
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