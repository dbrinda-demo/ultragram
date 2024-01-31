//i copied this from https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
//not handling pluralization in a reasonable way
//libraries like moment.js could be a better option

export function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' second(s) ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minute(s) ago';
  }

  else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hour(s) ago';
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed/msPerDay) + ' day(s) ago';
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed/msPerMonth) + ' month(s) ago';
  }

  else {
    return Math.round(elapsed/msPerYear ) + ' year(s) ago';
  }
}
