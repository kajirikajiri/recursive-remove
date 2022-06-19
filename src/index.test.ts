import { recursiveRemove } from ".";

const testCases: {
  testName: string;
  input: Parameters<typeof recursiveRemove>;
  expected: any;
}[] = [
  {
    testName: "remove: empty obj",
    input: [
      {},
      {
        removeOption: {
          isEmptyObject: true,
        },
      },
    ],
    expected: {},
  },
  {
    testName: "remove: empty array",
    input: [
      [],
      {
        removeOption: {
          isEmptyArray: true,
        },
      },
    ],
    expected: [],
  },
  {
    testName: "remove: falsy in object",
    input: [
      {
        a: 0,
        b: -0,
        c: BigInt(0),
        d: "",
        e: null,
        f: undefined,
        g: NaN,
        h: false,
      },
      {
        removeOption: {
          isFalsy: true,
        },
      },
    ],
    expected: {},
  },
  {
    testName: "not remove: falsy",
    input: [
      {
        a: 0,
        b: -0,
        c: BigInt(0),
        d: "",
        e: null,
        f: undefined,
        g: NaN,
        h: false,
      },
    ],
    expected: {
      a: 0,
      b: -0,
      c: BigInt(0),
      d: "",
      e: null,
      f: undefined,
      g: NaN,
      h: false,
    },
  },
  {
    testName: "not remove: truthy in object",
    input: [
      {
        a: {
          aa: 1,
        },
        b: {
          bb: "a",
        },
        c: {
          cc: true,
        },
      },
      {
        removeOption: {
          isFalsy: true,
        },
      },
    ],
    expected: {
      a: {
        aa: 1,
      },
      b: {
        bb: "a",
      },
      c: {
        cc: true,
      },
    },
  },
  {
    testName: "remove: falsy in array",
    input: [
      [0, -0, BigInt(0), "", null, undefined, NaN, false],
      {
        removeOption: {
          isFalsy: true,
        },
      },
    ],
    expected: [],
  },
  {
    testName: "not remove: falsy in array",
    input: [[0, -0, BigInt(0), "", null, undefined, NaN, false]],
    expected: [0, -0, BigInt(0), "", null, undefined, NaN, false],
  },
  {
    testName: "not remove: truthy in array",
    input: [
      [[[1, "a", true]]],
      {
        removeOption: {
          isFalsy: true,
        },
      },
    ],
    expected: [[[1, "a", true]]],
  },
  {
    testName: "remove: nested empty object",
    input: [
      {
        a: {
          aa: {},
        },
        b: {
          bb: {},
        },
      },
      {
        removeOption: {
          isEmptyObject: true,
        },
      },
    ],
    expected: {},
  },
  {
    testName: "not remove: nested empty object",
    input: [
      {
        a: {
          aa: {},
        },
      },
    ],
    expected: {
      a: {
        aa: {},
      },
    },
  },
  {
    testName: "remove: nested empty array",
    input: [
      [[[]], [[]]],
      {
        removeOption: {
          isEmptyArray: true,
        },
      },
    ],
    expected: [],
  },
  {
    testName: "not remove: nested empty array",
    input: [[[[]]]],
    expected: [[[]]],
  },
];

describe.each(testCases)(`recursiveRemove`, ({ testName, input, expected }) => {
  test(testName, () => {
    const result = recursiveRemove(input[0], input[1]);
    expect(result).toEqual(expected);
  });
});
