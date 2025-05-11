// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({ random: jest.fn() }));

describe('BankAccount', () => {
  let account: BankAccount;
  const initialBalance = 100;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const recipient = getBankAccount(0);
    expect(() => account.transfer(initialBalance + 1, recipient)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(initialBalance + 1, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const deposit = 50;
    expect(account.deposit(deposit).getBalance()).toBe(
      initialBalance + deposit,
    );
  });

  test('should withdraw money', () => {
    const withdraw = 50;
    expect(account.withdraw(withdraw).getBalance()).toBe(
      initialBalance - withdraw,
    );
  });

  test('should transfer money', () => {
    const recipient = getBankAccount(0);

    account.transfer(initialBalance, recipient);

    expect(account.getBalance()).toBe(0);
    expect(recipient.getBalance()).toBe(initialBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 25;

    (random as jest.Mock).mockReturnValueOnce(balance);
    (random as jest.Mock).mockReturnValueOnce(1);

    expect(await account.fetchBalance()).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 150;

    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(balance));
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
