'use strict';

import express from 'express';
import http from '../../middlewares/http.js';
const router = express.Router();
import { getPosts } from '../endpoints/posts.js';

router.get('/', [http(getPosts)]); //path /posts

export default router;
