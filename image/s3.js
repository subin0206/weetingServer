const AWS = require('aws-sdk');
var multer = require("multer");
var multerS3 = require("multer-s3");

const path = require("path");

const dotenv = require('dotenv');
dotenv.config()

const { AWS_config_region, AWS_IDENTITYPOOLID } = process.env;

const bucket = 'weeting';

AWS.config.update({
    region : AWS_config_region,
    credentials : new AWS.CognitoIdentityCredentials({
        IdentityPoolId : AWS_IDENTITYPOOLID
    })
})

const s3 = new AWS.S3();
// const s3 = new AWS.S3({
    // apiVersion : "2006-03-01",
    // params : {Bucket : bucket}
// });

const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : bucket,
        // contentType : multerS3.AUTO_CONTENT_TYPE,
        acl : "public-read",
        key : (req, file, cb) => {
            let extension = path.extname(file.originalname) // 뒤에 .jpg 이런거 말하는 것.
            // cb(null, 'moim_image/'+Date.now().toString + extension); // toString 붙이면 이상하게 저장됨. function toString() { [native code] }.jpg 이렇게.
            cb(null, 'moim_image/' + Date.now() + extension); // 이렇게 하면 moim_image 폴더 안에 Date.now() + extension = 이상한 숫자들 10글자정도의 나열로 저장됨.
        }
    }),
    limits : {fileSize : 5 * 1024 * 1024}
})


// 로컬에 저장 할 때 ========

// var multer = require("multer");

// const upload = multer({
//     dest: 'uploads/'
// });

// module.exports = upload

// =========================

module.exports = upload