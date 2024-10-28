import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//writing, event 라우터 추가
import writingsRouter from './routes/writings.js';
import eventsRouter from './routes/events.js';


const app = express();

//body parser set
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// event route 사용
app.use('/events', eventsRouter); // '/events' 경로에 이벤트 라우터 연결

//view engine set
app.set('view engine', 'html'); //main.html -> main(.html)

//nunjucks
nunjucks.configure('views', {
    watch: true, //html파일이 수정될 경우 다시반영 후 렌더링
    express: app
});             


//mongoose connect
mongoose
    .connect('mongodb://localhost:27017/test')
    .then(() => { console.log('MongoDB connected...')})
    .catch(e => console.log(e));


// 라우트 등록
app.use('/writings', writingsRouter); // writings 라우트 등록
app.use('/events', eventsRouter);      // events 라우트 등록


// 메인 페이지
app.get('/', (req, res) => res.redirect('/writings'));


app.listen(3080,()=>{
    console.log('Server is running on port 3080a');
});

//블로그 화면구성 메인페이지 네비게이션바 풋터
//블로그 CRUD 글작성,목록,상세페이지,수정,삭제
//nodemon 설치 npm install nodemon -D

//템플릿 엔진 ejs nunjucks

// 글작성
// 글 목록 main page 페이지 접속, GET요청 /
// 글 작성 write page 접속 GET 작성 POST /write
// 글 상세 페이지 detail page 접속 GET /detail
// 글 수정 페이지 edit page 접속 GET 수정 POST /edit 

//버퍼 데이터 <Buffer 5b 5d>를 얻음 