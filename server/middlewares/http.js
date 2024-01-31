'use strict';

import ApiError from '@nomad/errors';

export default function http(endpoint) {
  return (req, res, next) => {
    const options = {
      params: Object.assign({}, req.params, req.query),
      headers: req.headers,
    };

    return endpoint(options, req)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        if (error === undefined || error === null || error.code === undefined) {
          if (error) {
            console.log(error);
          }
          next(new ApiError('Internal Error', 500));
        } else {
          next(error);
        }
      });
  };
}
