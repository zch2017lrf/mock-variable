/**
 * Created by hustcc
 */

var expect = require('expect');
var VT = require('variable-type');
var MV = require('../');
var random = require('../src/random.js');

const RANDOM_CNT = 100; // random test count.

describe('mock-variable', function() {


  it(' - usage bool', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(MV.bool().mock(), VT.bool)).toBe(true);
    }
  });

  it(' - usage number', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(MV.number(100, 999).mock(), VT.and([
        VT.number,
        VT.apply(function (e) { return e >= 100 && e <= 999; })
      ]))).toBe(true);

      expect(VT.check(MV.number(100, 999, 2).mock(), VT.and([
        VT.number,
        VT.apply(function (e) { return e >= 100 && e <= 999; })
      ]))).toBe(true);

      expect(MV.number(100).mock()).toBe(100);

      expect(VT.check(MV.number(1, 100).mock(), VT.apply(function (e) {
        return e >= 1 && e <= 100;
      }))).toBe(true);

      expect(VT.check(MV.number(100, 1).mock(), VT.apply(function (e) {
        return e >= 1 && e <= 100;
      }))).toBe(true);
    }
  });

  it(' - usage string', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(MV.string(10).mock(), VT.and([
        VT.string,
        VT.apply(function (e) { return e.length === 10; })
      ]))).toBe(true);

      expect(VT.check(MV.string().mock(), VT.and([
        VT.string,
        VT.apply(function (e) { return e.length === 8; })
      ]))).toBe(true);
    }
  });

  it(' - usage arrayOf', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(MV.arrayOf(MV.number(10, 11), 6, 12).mock(), VT.arrayOf(
        VT.and([
          VT.number,
          VT.in([10, 11])
        ])
      ))).toBe(true);
      expect(VT.check(MV.arrayOf(MV.number(10, 11), 12, 6).mock(), VT.arrayOf(
        VT.and([
          VT.number,
          VT.in([10, 11])
        ])
      ))).toBe(true);
    }
    expect(MV.arrayOf('hustcc', 1, 1).mock()).toEqual(['hustcc']);

    expect(MV.arrayOf('hustcc', 2).mock()).toEqual(['hustcc', 'hustcc']);
    expect(VT.check(
      MV.arrayOf('hustcc').mock(),
      VT.and([
        VT.arrayOf(VT.oneOf(['hustcc'])),
        VT.apply(function (e) { return e.length === 20; })
      ]))).toBe(true);
  });

  it(' - usage shape', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(MV.shape({
        name: MV.string(10),
        id: MV.number(10000, 1000000),
        sex: MV.bool(),
        city: MV.constant('hz'),
        age: 24
      }).mock(), VT.shape({
        name: VT.string,
        id: VT.number,
        sex: VT.bool,
        city: VT.oneOf(['hz']),
        age: VT.oneOf([24])
      }))).toBe(true);
    }
    expect(function () { return MV.shape(''); }).toThrow('The parameter of mocker shape should be object.');
  });

  it(' - usage constant', function () {
    expect(MV.constant('hustcc').mock()).toBe('hustcc');
  });

  it(' - usage oneOf', function () {
    expect(function () { return MV.oneOf('hustcc'); })
      .toThrow('The parameter of mocker oneOf should be an array which is not empty.');
    expect(function () { return MV.oneOf([]); })
      .toThrow('The parameter of mocker oneOf should be an array which is not empty.');
    expect(VT.check(
      MV.oneOf(['hustcc', 'imcxl']).mock(),
      VT.oneOf(['hustcc', 'imcxl']))
    ).toBe(true);
  });

  it(' - usage apply', function () {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(MV.apply(function () {
        return 'hustcc';
      }).mock()).toBe('hustcc');
    }
  });


  // below test is for random.js
  it(' - random bool', function() {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(random.randomBool(), VT.bool)).toBe(true);
    }
  });

  it(' - random string', function() {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(random.randomString(10), VT.and([
        VT.string,
        VT.apply(function (e) { return e.length === 10; }),
      ]))).toBe(true);
      expect(VT.check(random.randomString(-1), VT.and([
        VT.string,
        VT.apply(function (e) { return e.length === 0; }),
      ]))).toBe(true);
    }
  });

  it(' - random number', function() {
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(random.randomNumber(1, 9, 2),VT.and([
        VT.number,
        VT.apply(function (e) { return ('' + e).length <= 4; }), // 小数位
        VT.apply(function (e) { return e >= 1 && e <= 9; }) // 包含 1 和 10
      ]))).toBe(true);
    }
    for (var i = 0; i < RANDOM_CNT; i += 1) {
      expect(VT.check(random.randomNumber(1, 10), VT.and([
        VT.number,
        VT.apply(function (e) { return e >= 1 && e <= 10; }) // 包含 1 和 10
      ]))).toBe(true);
    }
  });
});