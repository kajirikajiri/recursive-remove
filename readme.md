<img width="100" src="https://user-images.githubusercontent.com/37785038/174469328-06db9732-6873-45bb-b4ed-a60540eec0af.svg"/>

# Recursive remove

[![CI:UT](https://github.com/kajirikajiri/recursive-remove/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kajirikajiri/recursive-remove/actions/workflows/npm-publish.yml)

## Usage
```javascript
import {recursiveRemove} from 'recursive-remove';

const a = [
  0,
  -0,
  BigInt(0),
  "",
  null,
  undefined,
  NaN,
  false
]
recursiveRemove(
  a,
  {
    removeOption: {
      isFalsy: true,
    },
  },
);
console.log(a) // []
```

```javascript
import {recursiveRemove} from 'recursive-remove';

const a = {
  a: 0,
  b: -0,
  c: BigInt(0),
  d: "",
  e: null,
  f: undefined,
  g: NaN,
  h: false,
}
recursiveRemove(
  a,
  {
    removeOption: {
      isFalsy: true,
    },
  },
);
console.log(a) // {}
```

[other examples](https://github.com/kajirikajiri/recursive-remove/blob/main/src/index.test.ts)

## Installation
```sh
npm install recursive-remove
```
