'use strict';

//this is very basic and could be significantly improved, but better than nothing

export default function requestLogger() {
  return (req, res, next) => {
    const log = `[localhost] ${req.method} ${req.originalUrl}`;
    console.log(log);

    next();
  };

}
