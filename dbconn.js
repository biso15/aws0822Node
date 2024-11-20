const mysql = require('mysql');  // mysql 모듈 로드
const conn_info = {
    host : '127.0.0.1',  // 내부 랜카드 ip주소. localhost와 같다.
    port : '3306',  // mysql 기본값 포트번호
    user : 'root',
    password : '1234',
    database : 'aws0822'
};

module.exports = {
    init : function() {  // 초기형태
        return mysql.createConnection(conn_info);
    },
    connect : function(conn) {  // 연결정보
        conn.connect(function(err) {
            if(err) {
                console.error("오류 : " + err);
            } else {
                console.log("success!");
            }
        });
    }
}