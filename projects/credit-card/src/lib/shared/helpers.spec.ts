import { range, stringifyArray, getKeyByValue } from '@cc-project/lib/shared/helpers';

describe('helpers', () => {
  describe('range function', () => {
    it('should return array of numbers from X to Y', () => {
      const mockArray: Array<number> = range(15, 20);
      const expectedArray: Array<number> = [15, 16, 17, 18, 19, 20];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should return array of numbers from -X to Y', () => {
      const mockArray: Array<number> = range(-5, 0);
      const expectedArray: Array<number> = [-5, -4, -3, -2, -1, 0];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should return array of numbers from X to X', () => {
      const mockArray: Array<number> = range(41, 41);
      const expectedArray: Array<number> = [41];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should return null if null was passed', () => {
      expect(range(null, null)).toBeNull();
    });

    it('should return null if undefined was passed', () => {
      expect(range(undefined, undefined)).toBeNull();
    });
  });

  describe('stringifyArray function', () => {
    it('should return converted array of numbers to array of strings', () => {
      const mockArray: Array<string> = stringifyArray([15, 16, 17, 18, 19, 20]);
      const expectedArray: Array<string> = ['15', '16', '17', '18', '19', '20'];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should array of strings if passed array of strings', () => {
      const mockArray: Array<string> = stringifyArray(['15', '16', '17', '18', '19', '20']);
      const expectedArray: Array<string> = ['15', '16', '17', '18', '19', '20'];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should return null if null was passed', () => {
      expect(stringifyArray(null)).toBeNull();
    });

    it('should return null if undefined was passed', () => {
      expect(stringifyArray(undefined)).toBeNull();
    });
  });

  describe('getKeyByValue', () => {
    it('should return key by value', () => {
      const mockMap: Map<string, number> = new Map();
      mockMap.set('Test 1', 123);
      mockMap.set('Test 2', 321);

      const mockMap2: Map<string, Array<string>> = new Map();
      mockMap2.set('1', ['Test1', 'Test2']);
      mockMap2.set('2', ['Test2', 'Test3']);

      expect(getKeyByValue(321, mockMap)).toEqual('Test 2');
      expect(getKeyByValue(['Test2', 'Test3'], mockMap2)).toEqual('2');
    });

    it('should return null if value was not found', () => {
      const mockMap: Map<string, number> = new Map();
      mockMap.set('Test 1', 123);
      mockMap.set('Test 2', 321);

      expect(getKeyByValue(3210, mockMap)).toBeNull();
    });
  });
});
