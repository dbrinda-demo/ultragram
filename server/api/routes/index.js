'use strict';

/*
GET /{ig-user-id}/media : Request here to retrieve posts by the user account.

GET /{ig-media-id} : Retrieve post details.

GET /ig_hashtag_search?user_id={user-id}&q={q} : Search by hashtag.
 */

import express from 'express';
const router = express.Router();
import ApiError from '@nomad/errors';

import search from '../routes/search.js';
import posts from '../routes/posts.js';

router.use('/posts', posts);
router.use('/search', search);

router.all('*', req => {
  console.log(`Unsupported route ${req.method} ${req.url}`);
  throw new ApiError('Unsupported Route', 404);
});

export default router;
