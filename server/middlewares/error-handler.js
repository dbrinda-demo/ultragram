'use strict';

export default function errorHandler() {
  return (error, req, res, next) => {
    const errorObj = {
      message: error.message,
      code: error.code,
      stack: error.stack //don't include stack trace to ui in real world system
    };

    res.status(error.code).json(errorObj);
  };
}
