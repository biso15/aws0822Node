// console.log("react Hello World");

// (웹)서버 생성(node)
const http = require('http');  // http 모듈 생성
http.createServer(  // http 모듈에서 서버 생성
    (req, res) => {  // 람다식
        res.statusCode = 200;  // 연결성공코드
        res.setHeader('Content-Type', 'text/html; charset=utf8');  // res.setHeader('Content-Type', 'text/plain');
        res.end('마치된것같아 손오공');
    }
).listen(3000);  // listen(포트번호)

// function 이름없는함수(req, res) {
//     res.statusCode = 200;
//     return;
// }