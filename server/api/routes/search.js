import express from 'express';
import http from '../../middlewares/http.js';
const router = express.Router();
import { searchByHashTag } from '../endpoints/search.js';

router.get('/hashtag', [http(searchByHashTag)]); //path /search/hashtag/<userId>?query=<query>

export default router;
