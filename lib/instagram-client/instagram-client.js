'use strict';

import BaseClient from '@nomad/base-client';
import config from '@nomad/config';

//facebook sdk designed to run in browser, decided to make my own

export class InstagramClientClass extends BaseClient {

  constructor(apiVersion, accessToken) {
    super('graph.facebook.com', 443);
    this.apiVersion = apiVersion || config.facebookApiVersion;
    this.accessToken = accessToken || config.facebookAccessToken;
  }

  getPageList() {
    return this.request({
      method: 'GET',
      path: `/${this.apiVersion}/me/accounts?access_token=${this.accessToken}`
    });
  }

  getPageDetails(pageId) {
    if (typeof pageId !== 'string') {
      throw new Error(`Invalid pageId: ${pageId}`);
    }

    return this.request({
      method: 'GET',
      path: `/${this.apiVersion}/${pageId}?fields=instagram_business_account&access_token=${this.accessToken}`
    });
  }

  getPosts(instagramUserId, cursor_, size) {
    if (typeof instagramUserId !== 'string') {
      throw new Error(`Invalid instagramUserId: ${instagramUserId}`);
    }
    if (typeof size !== 'number') {
      throw new Error(`Invalid size: ${size}`);
    }
    let cursor = '';
    if (typeof cursor_ === 'string') {
      cursor = `&after=${encodeURIComponent(cursor_)}`;
    }

    //there are better ways to compose urls
    //probably shouldnt hard code fields here
    return this.request({
      method: 'GET',
      path: `/${this.apiVersion}/${instagramUserId}/media?fields=id,caption,like_count,media_type,media_url,timestamp&limit=${size}${cursor}&access_token=${this.accessToken}`
    });
  }

  getAlbumImages(albumId) {
    if (typeof albumId !== 'string') {
      throw new Error(`Invalid albumId: ${albumId}`);
    }

    return this.request({
      method: 'GET',
      path: `/${this.apiVersion}/${albumId}/children?fields=id,media_url&access_token=${this.accessToken}`
    });
  }

}

export default new InstagramClientClass();
