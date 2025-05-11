// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 1, b: -1, action: Action.Add });
    expect(sum).toBe(0);
  });

  test('should subtract two numbers', () => {
    const subtract = simpleCalculator({ a: 1, b: -1, action: Action.Subtract });
    expect(subtract).toBe(2);
  });

  test('should multiply two numbers', () => {
    const subtract = simpleCalculator({ a: 1, b: -1, action: Action.Multiply });
    expect(subtract).toBe(-1);
  });

  test('should divide two numbers', () => {
    const subtract = simpleCalculator({ a: 1, b: -2, action: Action.Divide });
    expect(subtract).toBe(-0.5);
  });

  test('should exponentiate two numbers', () => {
    const subtract = simpleCalculator({
      a: 2,
      b: -2,
      action: Action.Exponentiate,
    });
    expect(subtract).toBe(0.25);
  });

  test('should return null for invalid action', () => {
    const subtract = simpleCalculator({ a: 1, b: -2, action: -1 });
    expect(subtract).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const subtract = simpleCalculator({ a: '', b: 'kek', action: Action.Add });
    expect(subtract).toBeNull();
  });
});
