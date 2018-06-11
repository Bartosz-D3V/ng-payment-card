import { range, stringify } from '@cc-project/lib/shared/helpers';

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

  describe('stringify function', () => {
    it('should return converted array of numbers to array of strings', () => {
      const mockArray: Array<string> = stringify([15, 16, 17, 18, 19, 20]);
      const expectedArray: Array<string> = ['15', '16', '17', '18', '19', '20'];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should array of strings if passed array of strings', () => {
      const mockArray: Array<string> = stringify(['15', '16', '17', '18', '19', '20']);
      const expectedArray: Array<string> = ['15', '16', '17', '18', '19', '20'];

      expect(mockArray).toEqual(expectedArray);
    });

    it('should return null if null was passed', () => {
      expect(stringify(null)).toBeNull();
    });

    it('should return null if undefined was passed', () => {
      expect(stringify(undefined)).toBeNull();
    });
  });
});
