'use strict';

//you could have an error class for each error type, but it's a lot of boilerplate for this project

export default class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
