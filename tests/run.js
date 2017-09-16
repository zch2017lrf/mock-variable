/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var MV = require('../');

var usersMocker = MV.arrayOf(MV.shape({
  id: MV.number(10000, 1000000), // id is between 10000 ~ 1000000.
  name: MV.string(6), // 6 length string.
  sex: MV.bool(), // true or false.
  city: 'hz', // constant value.
  work: MV.oneOf(['QA', 'FED'])
}), 2); // users list length is 2.

var mockData = usersMocker.mock();

console.log(usersMocker.mock());
