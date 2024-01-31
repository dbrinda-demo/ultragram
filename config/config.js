'use strict';

//in real environment, you would not put something like an important access token here

export default {
  facebookAccessToken: '<YOUR API KEY HERE>',
  facebookApiVersion: 'v19.0', //other versions not tested at all
  facebookAppName: null, //if not specified, will default to the first page returned by /me/accounts
  facebookBusinessAccountId: null, //if not specified, will look up and cache until server is shut down
  ports: {
    server: 9000,
    ui: 8080, //changing this has no effect, read only
  },
  defaultRequestTimeout: 5000, //5 seconds
  defaultPageSize: 1 //how many posts to fetch from instagram at a time
}
