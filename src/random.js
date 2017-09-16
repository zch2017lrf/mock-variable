/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var fixedRound = require('fixed-round');

// TODO the chars to be random.
var CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$';

var random = Math.random;

/**
 * random a number.
 * @param min
 * @param max
 * @param fixed
 * @returns {*}
 */
function randomNumber(min, max, fixed) {
  if (fixed === undefined) fixed = 0;
  // include max and min
  if (min > max) {
    // swap them with xor
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }
  return fixedRound(random() * (max - min) + min, fixed);
}

/**
 * random boolean.
 * @returns {boolean}
 */
function randomBool() {
  return !!randomNumber(0, 1);
}

/**
 * random a char.
 * @returns {*}
 */
function randomChar() {
  return CHARS[randomNumber(0, CHARS.length - 1)];
}

/**
 * random a string.
 * @param len
 * @returns {string}
 */
function randomString(len) {
  if (len < 0) len = 0;
  var arr = [];
  while (len > 0) {
    arr.push(randomChar());
    len -= 1;
  }
  return arr.join('');
}

module.exports = {
  random: random,
  randomString: randomString,
  randomNumber: randomNumber,
  randomBool: randomBool,
  CHARS: CHARS // for test case.
};
