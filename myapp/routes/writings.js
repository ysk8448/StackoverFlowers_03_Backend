// routes/writings.js
import express from 'express';
import Writing from '../models/Writing.js';

const router = express.Router();

// 메인 페이지 GET 요청 (글 목록 조회)
router.get('/', async (req, res) => {
    try {
        const writings = await Writing.find({}).sort({ date: -1 }); //최신순으로 정렬
        res.render('main', { list: writings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve writings');
    }
});

// 글 작성 페이지 GET 요청
router.get('/write', (req, res) => {
    res.render('write');
});

// 글 작성 POST 요청
router.post('/write', async (req, res) => {
    const { title, contents } = req.body;
    const writing = new Writing({ title, contents });

    try {
        await writing.save();
        console.log('Writing saved successfully');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('write');
    }
});

// 글 수정 페이지 GET 요청
router.get('/edit/:id', async (req, res) => {
    try {
        const writing = await Writing.findById(req.params.id);
        res.render('detail', { edit: writing });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve writing for edit');
    }
});

// 글 수정 POST 요청
router.post('/edit/:id', async (req, res) => {
    const { title, contents } = req.body;
    try {
        await Writing.replaceOne({ _id: req.params.id }, { title, contents });
        console.log('Writing updated successfully');
        res.redirect(`/detail/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update writing');
    }
});

// 글 삭제 POST 요청
router.post('/delete/:id', async (req, res) => {
    try {
        await Writing.deleteOne({ _id: req.params.id });
        console.log('Writing deleted successfully');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete writing');
    }
});


// default로 내보내기
export default router;
