// 서버 설정(express)
const express = require('express');  // express 모듈 가져옴
const app = express();
const port = 3002;

// db 연결
// __dirname : 기본경로
var dbconn = require(__dirname + "/dbconn.js");  // dbconn 모듈 가져옴
var conn = dbconn.init();  // db 정보 받아서 연결객체 생성
dbconn.connect(conn);  // db 연결

// Body Paser 설정. parser : 데이터만 추출하는 것(xml인 경우 태그를 제외한 데이터 부분만 추출)
var bodyParser = require("body-parser");  // 데이터 추출 파서 사용
app.use(bodyParser.json());  // bodyParser.json() : 클라이언트가 전송한 데이터를 Json 형식으로 파싱
app.use(bodyParser.urlencoded({extended:false}));  // url 인코딩된 방식으로 파싱

// 파일 경로 설정
app.use("/style", express.static(__dirname + "/style"));  // 가상경로와 폴더 매칭. /style 으로 들어오면 기본경로/style으로 보낸다.

// get방식으로 root(/)에 접속하면 기본경로/index.html로 보낸다.
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");  // sendFile -> java의 sendRedirect와 비슷
});
// function 이름없는함수(req, res) {
//     res.sendRedirect(경로);
//     return;
// }

// get 요청 처리
app.get("/boardWrite", (req, res)=>{
    res.sendFile(__dirname + "/boardWrite.html");
})

// post 요청 처리
app.post("/boardWriteAction", function(req, res) {
    var body = req.body;  // form 에서 넘긴 값들을 추출
    // console.log(body);

    var sql = "insert into board(originbidx, depth, level_, subject, contents, writer, password, midx)" + 
        " values(null, 0, 0, ?, ?, ?, ?, '1035')";
    var sql2 = "update board set originbidx =(select A.maxbidx from (select max(bidx) as maxbidx from board)A) where bidx = (select A.maxbidx from (select max(bidx) as maxbidx from board)A)";
    
    var params = [body.subject, body.contents, body.writer, body.password];
    console.log(sql);

    conn.query(sql, params, function(err, results, fields) {
        if(err) {
            console.log(err);
        }
        console.log(results);
    });

    conn.query(sql2, params, function(err, results, fields) {
        if(err) {
            console.log(err);
        }
        console.log(results);
    });

    res.redirect("/");

})

// 서버 실행
app.listen(port, ()=>{  // 감지기 호출
    console.log("server running ~~ (port:" + port + ")");
});