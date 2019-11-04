var express = require("express");
var router = express.Router();
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

const multer = require('multer');

var storage = multer.diskStorage({
  /* 어느 폴더안에 업로드 한 파일을 저장할 지를 결정 */
  destination: function (req, file, cb) {
    /* upload/mypage 폴더에 파일을 저장 */
    cb(null, 'upload/')
  },
  /* 폴더안에 저장되는 파일 명을 결정하는데 사용 */
  filename: function (req, file, cb) {
    /* 파일명이 중복되는 것을 막기 위해서 서버시간 + 파일명으로 지정 */
    cb(null, Date.now() + '-' + file.originalname)
  }
})
/* storage의 옵션을 가진 multer를 변수 upload로 선언 */
const upload = multer({ storage: storage });

router.post("/", upload.single('file'), function (req, res) {
  /* Article 테이블의 데이터를 생성하는 SQL문 */
  console.log(req.body);
  console.log('원본파일명 : ' + req.file)

  /* console.log('원본파일명 : ' + req.body.formData.file.originalname) */
  /*   console.log('원본파일명 : ' + req.file.originalname)
    console.log('저장파일명 : ' + req.file.filename)
    console.log('크기 : ' + req.file.size) */

  Article.create({
    db_title: req.body.title,
    db_date: req.body.date,
    db_money: req.body.money,
    db_address: req.body.address,
    db_img: req.file.filename
  })
    .then(result => {
      console.log("result : " + result);
      res.status(201).json({ result: "공고가 등록 되었습니다." });
    })
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
