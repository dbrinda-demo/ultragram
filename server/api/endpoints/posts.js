'use strict';

import postBL from '../../business-logic/posts.js';
import config from '@nomad/config';
import ApiError from '@nomad/errors';

//the idea is to do basic input validation and possibly things
//like user auth/entitlement in a thin layer on top of BL layer
//BL layer could be reused by other endpoints/parts of service/app
//for this app it's pretty pointless though

export async function getPosts(options) {
  const cursor = options.params.cursor || null;
  let size = config.defaultPageSize;
  if (options.params.size) {
    size = parseInt(options.params.size);
  }
  if (isNaN(size)) {
    throw new ApiError(`invalid size ${size}`, 400);
  }

  return postBL.getPosts(cursor, size);
}

