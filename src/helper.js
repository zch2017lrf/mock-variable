/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */


function mockerValue(mocker) {
  return mocker.mock ? mocker.mock() : mocker;
}

module.exports = {
  mockerValue: mockerValue
};
