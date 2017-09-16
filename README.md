# mock-variable

> [WIP] Generate fake / mock structured variable in a modern, human-readable way.
>
> 用一个现代的、可读的的方式来生成用于测试的假数据。

[![Ver](https://img.shields.io/npm/v/mock-variable.svg)](https://www.npmjs.com/package/mock-variable) [![Build Status](https://travis-ci.org/hustcc/mock-variable.svg?branch=master)](https://travis-ci.org/hustcc/mock-variable) [![Coverage Status](https://coveralls.io/repos/github/hustcc/mock-variable/badge.svg?branch=master)](https://coveralls.io/github/hustcc/mock-variable) [![npm download](https://img.shields.io/npm/dm/mock-variable.svg)](https://www.npmjs.com/package/mock-variable)


## 1. Install

> **npm i --save mock-variable**

Then import it.

```js
import MV from 'mock-variable'; // ES6
var MV = require('mock-variable'); // ES5 with npm
```


## 2. API & Mocker

Before use it to mock fake data, you should get the `mocker` firstly.
 
How to get the `mocker`? we have:

 - **MV.bool()**
 - **MV.number(min[, max = min, fixed = 0])**
 - **MV.string([len = 8])**
 - **MV.arrayOf(mocker[, min = 20, max = min])**
 - **MV.shape(mockerObject)**
 - **MV.oneOf(valueArray)**
 - **MV.constant(value)**
 - **MV.apply(Function)**

You can assemble the variable structure arbitrarily. After you got the mocker, then use `mocker.mock()` to get the fake data.

You can see all the usage in the [test cases file](tests/test.js).

If more `Mocker` are needed, welcome to `send a pull request`, or put an issue to me.


## 3. Usage examples

Here is some examples. More you can see in [tests/test.js](tests/test.js) file.

 - Simple usage

```js
MV.number(1, 9, 2).mock(); // got random number like 2.93
MV.string(6).mock(); // got random string like `Qv_teE`
MV.bool().mock(); // got true / false
MV.oneOf(['hustcc', 'imcxl']); // got random element from the array
MV.constant('hello, hustcc.').mock(); // got string `hello, hustcc`
MV.constant(null).mock(); // got null
MV.apply(function() { return Math.random(); } )); // will got number generate by Math.random()
```

 - `arrayOf`

```js
var mocker = MV.arrayOf(VT.string(4), 10, 20);

mocker.mock(); // got an array which contains string, and array length 10 ~ 20.
```

 - `shape`

```js
var mocker = MV.shape({
  name: MV.string(10),
  id: MV.number(10000, 1000000),
  sex: MV.bool(),
  city: 'hz',
});

mocker.mock(); // got a random value object.
```

 - Complex usage

```js
var mocker = MV.arrayOf({
  name: MV.string(),
  id: MV.number(10000, 1000000),
  sex: MV.bool(),
  city: 'hz',
});

mocker.mock(); // will got an array of users, and the list's length is 20.
```


## 4. Test

```
npm i

npm t
```


## License

ISC@[hustcc](https://github.com/hustcc).


