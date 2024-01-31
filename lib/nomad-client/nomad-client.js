'use strict';

import BaseClient from '@nomad/base-client';
import config from '@nomad/config';

//suboptimal to handcraft clients in real production system
//will save me time with only 3 apis
//use something like swagger instead

class NomadClient extends BaseClient {

  constructor() {
    super('localhost', config.ports.server, 'http');
    //would likely be handled differently in real system
  }

  getPosts(cursor_, size = config.defaultPageSize) {
    const cursor = cursor_ ? `&cursor=${encodeURIComponent(cursor_)}` : '';
    const options = {
      method: 'GET',
      path: `/posts?size=${size}${cursor}`,
    };

    return this.request(options);
  }

  searchHashTag(query) {
    query = encodeURIComponent(query);

    const options = {
      method: 'GET',
      path: `/search?query=${query}`,
    };

    return this.request(options);
  }

}

export default new NomadClient();
