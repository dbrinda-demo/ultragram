'use strict';

import * as https from 'https';
import * as http from 'http';
import config from '@nomad/config';
import ApiError from '@nomad/errors';


class BaseClient {

  constructor(host, port, protocol = 'https') {
    if (!host || !port) {
      throw new Error('Invalid client config');
    }
    this.host = host;
    this.port = port;
    this.protocol = protocol;
  }

  async request(options_, timeout) {
    const options = {
      timeout: timeout || config.defaultRequestTimeout,
      host: this.host,
      port: this.port,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...options_,
    };

    return this.#request(options);
  }

  #httpRequest(options, callback) {
    if (this.protocol === 'http') {
      return http.request(options, callback);
    }
    return https.request(options, callback);
  }

  #request(options) {
    return new Promise((resolve, reject) => {
      const req = this.#httpRequest(options, res => {
        let chunks = [];
        let data;

        res.on('data', chunk => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          if (chunks.length > 0) {
            let dataStr;
            try {
              dataStr = chunks.join('');
              data = JSON.parse(dataStr);
            } catch (e) {
              console.log(`request failed: ${options.method} ${options.path}`);
              console.log(dataStr);
              console.log(e);
              reject(new ApiError('Service Unavailable', 503));
              return;
            }
          }

          if (res.statusCode === 200) {
            resolve(data);
          } else {
            console.log(`request failed: ${options.method} ${options.path} ${res.statusCode}`);
            reject(new ApiError('Request Failed', res.statusCode));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        console.log(`request timeout: ${options.method} ${options.path}`);
        reject(new ApiError('Request Timeout', 504));
      });

      req.on('error', e => {
        console.log(`request error: ${options.method} ${options.path}\n${e.message}`);
        reject(new ApiError(`Request Error`, 500));
      });

      req.end();
    });
  }

}

export default BaseClient;
