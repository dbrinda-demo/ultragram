'use strict';

import config from '@nomad/config';
import ApiError from '@nomad/errors';
import instagramClient from '@nomad/instagram-client';
import { pageModel, postModel } from '../models/instagram.js';

//i cached the business account id to reduce requests to instagram
//they have 200/hr request limit. probably not the right way to handle for a real app

class PostsBL {

  constructor() {
    this.businessAccountId = config.facebookBusinessAccountId;
    this.postCache = {};
  }

  async getPosts(cursor = null, size = config.defaultPageSize) {
    const cacheKey = cursor === null ? size : cursor + ':' + size; //prevent api rate limit for local testing
    if (this.postCache[cacheKey]) {
      //return this.postCache[cacheKey]; //used for dev, to avoid getting rate limited
    }
    if (this.businessAccountId === null) {
      const page = await this.#getPage();
      this.businessAccountId = await this.#getBusinessAccountId(page.id);
    }

    const [nextCursor, posts] = await this.#getPosts(this.businessAccountId, cursor, size);

    const response = { posts, cursor: nextCursor };
    this.postCache[cacheKey] = response;

    return response;
  }

  async #getPosts(accountId, cursor, size) {
    const postIds = await instagramClient.getPosts(accountId, cursor, size);
    if (!postIds || !postIds.data) {
      throw new ApiError(`You probably do not have correct permissions to the instagram account`, 400);
    }
    let nextCursor = postIds.paging?.cursors?.after || cursor;

    const albums = postIds.data.filter(p => p.media_type === 'CAROUSEL_ALBUM');
    const albumData = await this.#getAlbumData(albums);
    return [nextCursor, postIds.data.map(p => postModel(p, albumData))];
  }

  async #getAlbumData(albums) {
    //TODO: consider instagram batch api
    const albumMap = {};
    const albumData = await Promise.all(albums.map(a => instagramClient.getAlbumImages(a.id)));
    for (let i = 0; i < albumData.length; i++) {
      albumMap[albums[i].id] = albumData[i];
    }

    return albumMap;
  }

  async #getBusinessAccountId(pageId) {
    const details = await instagramClient.getPageDetails(pageId);
    if (!details || !details.instagram_business_account) {
      throw new ApiError(`Could not find instagram business account id for page ${pageId}`, 400);
    }

    return details.instagram_business_account.id;
  }

  async #getPage(){
    const pages_ = await instagramClient.getPageList();
    const pages = pageModel(pages_).pages;
    if (!pages || pages.length === 0) {
      throw new ApiError('Your account has no visible pages', 400);
    }

    let page;
    if (config.facebookAppName) {
      page = pages.find(p => p.name === config.facebookAppName);
    } else {
      page = pages[0];
    }

    if (!page) {
      throw new ApiError('Could not find a page for your app', 400);
    }

    return page;
  }
}

export default new PostsBL();
