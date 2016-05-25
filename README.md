[![version](https://img.shields.io/npm/v/setter.js.svg?label=version)](https://www.npmjs.org/package/setter.js) [![Build Status](https://img.shields.io/travis/Abdizriel/setter.js.svg?branch=master)](https://travis-ci.org/Abdizriel/setter.js/) [![Coverage](https://img.shields.io/coveralls/Abdizriel/setter.js.svg)](https://coveralls.io/github/Abdizriel/setter.js)

# Setter.js
The Promise based set object parameters for the modern browsers and node.

## Installation
```js
$ npm install --save setter.js
```

## Before
```js

var dataObj = {
  test: 'testString',
  test2: 'testString2',
  setTest: newValue => {
    const self = this;
    self.test = newValue;
    return new Promise(resolve => resolve(self));
  },
  setTest2: () => {
    const self = this;
    self.test2 = newValue;
    return new Promise(resolve => resolve(self));
  }
}

dataObj
  .setTest('updatedString')
  .then(response => console.log(response));


```

## After

```js
import setter from 'setter.js'

let dataObj = {
  test: 'testString',
  test2: 'testString2'
};
dataObj = setter(dataObj);

await dataObj.setTest('updatedString');

let config = {
  async: false,
  multiple: false
};
dataObj = setter(dataObj, config);
const testValue = dataObj.set('test', 'updatedString');

```

## API

### setter({Object} Object, {Object} [Config])
Object - provided argument where you want to add set functions.
Config - provided configuration object for additional options
Config.async - default true - setter functions returns Promise
Config.multiple - default true - if true you would add to object x setKey functions if false you would get only set('key', value) function