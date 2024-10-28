// events.js
import express from 'express';
import Event from '../models/Event.js'; // 이벤트 모델 참조 (모델 위치에 따라 경로 조정)

const router = express.Router();

// 이벤트 생성create (GET)
router.get('/create', (req, res) => {
    res.render('createEvent'); // 이벤트 생성 페이지 템플릿을 렌더링
});

// 이벤트 생성create (POST)
router.post('/create', async (req, res) => {
    const { date, start, end, description } = req.body;
    const startDate = new Date(`${date}T${start}`);
    const endDate = new Date(`${date}T${end}`);
    
    const newEvent = new Event({
        title: description,  // 필요시 입력받을 수 있음
        start: startDate,
        end: endDate,
        description,
        allDay: false
    });

    try {
        await newEvent.save();
        console.log('Event created successfully');
        res.redirect('/');  // 생성 후 메인 페이지로 리디렉션
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create event');
    }
});


// 이벤트 조회 API
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find({});
    // FullCalendar 형식에 맞게 데이터 가공
        const formattedEvents = events.map(event => ({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description,
            allDay: event.allDay
        }));
        res.json(formattedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve events');
    }
});


//

// 
export default router;
