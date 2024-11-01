import { Round } from '../models/round';
import {
  calculateRanking,
  calculateRoundResultsHistory,
  formatDateTime,
  formatNumber,
  getColor,
  getSum,
  getSummaryText,
} from './helpers';

describe('Utility functions', () => {
  describe('getColor', () => {
    it('should return "green" for positive numbers', () => {
      expect(getColor(5)).toBe('green');
    });
    it('should return "red" for negative numbers', () => {
      expect(getColor(-5)).toBe('red');
    });
    it('should return "grey" for zero', () => {
      expect(getColor(0)).toBe('grey');
    });
  });

  describe('formatNumber', () => {
    it('should add "+" for positive numbers', () => {
      expect(formatNumber(5)).toBe('+5');
    });
    it('should not add "+" for negative numbers', () => {
      expect(formatNumber(-5)).toBe('-5');
    });
    it('should display "0" without a sign', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('getSum', () => {
    it('should return the sum of numbers in an array', () => {
      expect(getSum([1, 2, 3])).toBe(6);
    });
    it('should handle an empty array', () => {
      expect(getSum([])).toBe(0);
    });
    it('should handle negative numbers', () => {
      expect(getSum([-1, -2, -3])).toBe(-6);
    });
  });

  describe('formatDateTime', () => {
    it('should format timestamp correctly', () => {
      const timestamp = new Date('1996-11-26T23:45:00').getTime();
      expect(formatDateTime(timestamp)).toBe('26-11-1996 23:45');
    });
  });
});

describe('Main functions with multiple balanced rounds', () => {
  const rounds: Round[] = [
    {
      id: '1',
      gameId: 'g1',
      timestamp: 1000,
      stats: { Alice: 10, Bob: -5, Carol: -5 },
    },
    {
      id: '2',
      gameId: 'g1',
      timestamp: 2000,
      stats: { Alice: -10, Bob: 10, Carol: 0 },
    },
    {
      id: '3',
      gameId: 'g1',
      timestamp: 3000,
      stats: { Alice: 5, Bob: -10, Carol: 5 },
    },
    {
      id: '4',
      gameId: 'g1',
      timestamp: 4000,
      stats: { Alice: 0, Bob: 15, Carol: -15 },
    },
    {
      id: '5',
      gameId: 'g1',
      timestamp: 5000,
      stats: { Alice: -5, Bob: -5, Carol: 10 },
    },
    {
      id: '6',
      gameId: 'g1',
      timestamp: 6000,
      stats: { Alice: 15, Bob: -15, Carol: 0 },
    },
    {
      id: '7',
      gameId: 'g1',
      timestamp: 7000,
      stats: { Alice: -10, Bob: 0, Carol: 10 },
    },
    {
      id: '8',
      gameId: 'g1',
      timestamp: 8000,
      stats: { Alice: 5, Bob: 5, Carol: -10 },
    },
    {
      id: '9',
      gameId: 'g1',
      timestamp: 9000,
      stats: { Alice: -5, Bob: 10, Carol: -5 },
    },
    {
      id: '10',
      gameId: 'g1',
      timestamp: 10000,
      stats: { Alice: 10, Bob: -10, Carol: 0 },
    },
  ];
  const playerNames = ['Alice', 'Bob', 'Carol'];

  describe('calculateRoundResultsHistory with 10 balanced rounds', () => {
    it('should calculate cumulative round results accurately for each player', () => {
      const result = calculateRoundResultsHistory(rounds, playerNames);
      expect(result).toEqual({
        Alice: [0, 10, 0, 5, 5, 0, 15, 5, 10, 5, 15],
        Bob: [0, -5, 5, -5, 10, 5, -10, -10, -5, 5, -5],
        Carol: [0, -5, -5, 0, -15, -5, -5, 5, -5, -10, -10],
      });
    });
  });

  describe('calculateRanking with 10 balanced rounds', () => {
    it('should calculate correct ranking based on the latest cumulative scores', () => {
      const roundResultHistory = calculateRoundResultsHistory(
        rounds,
        playerNames,
      );
      const result = calculateRanking(roundResultHistory);
      expect(result).toEqual([
        { name: 'Alice', stat: 15 },
        { name: 'Bob', stat: -5 },
        { name: 'Carol', stat: -10 },
      ]);
    });
  });

  describe('getSummaryText with 10 balanced rounds', () => {
    it('should return a formatted summary text for the final ranking', () => {
      const roundResultHistory = calculateRoundResultsHistory(
        rounds,
        playerNames,
      );
      const ranking = calculateRanking(roundResultHistory);
      expect(getSummaryText(ranking)).toBe('Alice: +15\nBob: -5\nCarol: -10\n');
    });
  });
});
