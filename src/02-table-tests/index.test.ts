// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TestCase = {
  a: number | string;
  b: number | string;
  action: Action | null;
  expected: number | null;
  actionDescription: string;
};

const testCases: TestCase[] = [
  {
    a: 1,
    b: -1,
    action: Action.Add,
    expected: 0,
    actionDescription: 'add two numbers',
  },
  {
    a: 1,
    b: -1,
    action: Action.Subtract,
    expected: 2,
    actionDescription: 'subtract two numbers',
  },
  {
    a: 1,
    b: -1,
    action: Action.Multiply,
    expected: -1,
    actionDescription: 'multiply two numbers',
  },
  {
    a: 1,
    b: -2,
    action: Action.Divide,
    expected: -0.5,
    actionDescription: 'divide two numbers',
  },
  {
    a: 2,
    b: -2,
    action: Action.Exponentiate,
    expected: 0.25,
    actionDescription: 'exponentiate two numbers',
  },
  {
    a: 1,
    b: -2,
    action: null,
    expected: null,
    actionDescription: 'return null for invalid action',
  },
  {
    a: '',
    b: 'kek',
    action: Action.Add,
    expected: null,
    actionDescription: 'return null for invalid arguments',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(`should $actionDescription`, (testCase) => {
    expect(simpleCalculator(testCase)).toBe(testCase.expected);
  });
});
