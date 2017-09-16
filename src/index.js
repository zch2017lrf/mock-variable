/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var random = require('./random.js');
var helper = require('./helper.js');
var Mocker = require('./mocker.js');


var randomBool = random.randomBool;
var randomString = random.randomString;
var randomNumber = random.randomNumber;
var mockerValue = helper.mockerValue;


/**
 * random String, with length given.
 */
function string(len) {
  len = len || 8; // the default length is 8.
  return new Mocker(function () {
    return randomString(len);
  });
}

/**
 * random Number, with min, max, fixed given.
 */
function number(min, max, fixed) {
  max = max || min;
  return new Mocker(function () {
    return randomNumber(min, max, fixed);
  });
}

/**
 * mock boolean
 */
function bool() {
  return new Mocker(randomBool);
}

/**
 * arrayOf mocker
 */
function arrayOf(mocker, min, max) {
  min = min || 20;
  max = max || min;
  return new Mocker(function () {
    var len = randomNumber(min, max);
    var r = [];
    for (var i = 0; i < len; i += 1) {
      r.push(mockerValue(mocker));
    }
    return r;
  });
}

function shape(mockerObject) {
  if (typeof mockerObject !== 'object') throw new Error('The parameter of mocker shape should be object.');
  return new Mocker(function () {
    var r = {};
    var mocker;
    for (var key in mockerObject) {
      mocker = mockerObject[key];
      r[key] = mockerValue(mocker);
    }
    return r;
  });
}

/**
 * 常量数值
 * @param v
 * @returns {Mocker}
 */
function constant(v) {
  return new Mocker(v);
}

/**
 * random one from an array.
 * @param arr
 * @returns {Mocker}
 */
function oneOf(arr) {
  if (!(arr instanceof Array) || arr.length === 0)
    throw new Error('The parameter of mocker oneOf should be an array which is not empty.');

  return new Mocker(function() {
    var i = randomNumber(0, arr.length - 1);
    return arr[i];
  });
}


/**
 * apply the function for random.
 * @param func
 */
var apply = function(func) {
  return new Mocker(func);
};


module.exports = {
  // the variable types.
  string: string,
  number: number,
  bool: bool,
  arrayOf: arrayOf,
  shape: shape,
  constant: constant,
  oneOf: oneOf,
  apply: apply
};
