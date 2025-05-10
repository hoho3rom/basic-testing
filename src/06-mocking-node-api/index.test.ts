// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = () => {};
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.useFakeTimers();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = () => {};
    const timeout = 1000;
    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(intervalSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout + 1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'test.txt';

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(await readFileAsynchronously('test')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Hello, world!';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(Buffer.from(fileContent));

    await readFileAsynchronously('test');
    expect(await readFileAsynchronously('test')).toBe(fileContent);
  });
});
