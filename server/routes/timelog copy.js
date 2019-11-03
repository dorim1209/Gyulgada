var express = require("express");
var router = express.Router();
var Timelog = require("../models").Timelog;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  /* Timelog 테이블의 데이터를 생성하는 SQL문 */
  Timelog.findAll({
    attributes: ["db_pnum", "db_name", "db_go", "db_leave", "db_timelog"],

    /* 조건과 값이 일치하는 경우 */
    where: {
      db_pnum: req.body.params.pnum,
      db_name: req.body.params.name
    }
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + JSON.stringify(result));

      let DB2 = JSON.stringify(result);
      let DB1 = JSON.parse(DB2);
      let DB = DB1[0];
      if (DB) {
        console.log("DB", DB);

        //req.session.login = true;
        res.json({ result: 1, ptype: DB.db_ptype, birth: DB.db_birth });
      } else {
        res.json({ result: 0 });
      }
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
      next(err);
    });
});

module.exports = router;
