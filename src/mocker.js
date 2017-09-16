/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

/**
 * mocker class
 * @param mocker
 * @constructor
 */
function Mocker(mocker) {
  this.mocker = mocker;
}

/**
 * got the generated mock data
 * @returns {*}
 */
Mocker.prototype.mock = function () {
  return typeof this.mocker === 'function' ?
    this.mocker() : this.mocker;
};

module.exports = Mocker;
