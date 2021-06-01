const express = require('express');
const router = express.Router();
const moimController = require('../controllers/moimController');
const upload = require('../image/s3');

router.post('/createMoim', upload.single('meeting_img') ,moimController.createMoim);

router.get('/showDetailMoim/:meeting_id', moimController.showDetailMoim); // 모임 수정 버튼 누를 때도 적용

router.post('/editMoim/:meeting_id', upload.single('meeting_img'), moimController.editMoim);

router.get('/deleteMoim/:meeting_id', moimController.deleteMoim);

// router.get('/showMoimList', moimController.showMoimList);

// router.get('/testMoim', moimController.testMoim);

module.exports = router;