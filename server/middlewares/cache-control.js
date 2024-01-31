'use strict';

export function noCache() {
  return (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
  };
}
