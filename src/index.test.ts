import {describe, expect, test} from '@jest/globals';
import {GetFormattedDate, getDiffBetweenDates} from './index';

describe('generate format date', () => {
  test('get formatted date should be equal to current date', () => {
    expect(new GetFormattedDate(new Date(), 'DD/MM/YYYY').date).toBe('27/04/2025');
  });
});