// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    jest.spyOn(axios, 'create');
    jest.mock('axios', () => ({
      create: jest.fn(() => jest.requireActual('axios').create({ baseURL })),
    }));

    throttledGetDataFromApi('');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts';

    const originalAxiosInstance = jest
      .requireActual('axios')
      .create({ baseURL });
    const mockGet = jest.fn(() => originalAxiosInstance.get());
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ ...originalAxiosInstance, get: mockGet });

    throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const response = { data: 'Hello World!' };

    const mockGet = jest.fn(() => response);
    const originalAxiosInstance = jest
      .requireActual('axios')
      .create({ baseURL });
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ ...originalAxiosInstance, get: mockGet });

    const responseData = await throttledGetDataFromApi('');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockGet).toHaveBeenCalled();
    expect(responseData).toEqual(response.data);
  });
});
