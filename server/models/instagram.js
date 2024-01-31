'use strict';

import ApiError from '@nomad/errors';

//try to insulate against facebook api changes
//less places to change code

function wrapper(callback) {
  try {
    return callback();
  } catch (e) {
    console.log('error parsing model');
    console.log(e);
    throw new ApiError('Internal Error', 500);
  }
}

export function pageModel(model) {
  return wrapper(() => {
    return {
      pages: model.data.map(d => {
        return {
          name: d.name,
          id: d.id,
        }
      })
    }
  });
}

function albumModel(model) {
  return wrapper(() => {
    return model.data.map(d => d.media_url);
  });
}

export function postModel(model, albumMap) {
  return wrapper(() => {
    const time = new Date(model.timestamp);
    let albumUrls = null;
    if (model.media_type === 'CAROUSEL_ALBUM' && albumMap) {
      albumUrls = albumModel(albumMap[model.id]);
    }

    return {
      id: model.id,
      caption: model.caption,
      likeCount: model.like_count,
      mediaType: model.media_type,
      mediaUrl: model.media_url,
      albumUrls,
      timestamp: time.getTime(),
    }
  });
}

