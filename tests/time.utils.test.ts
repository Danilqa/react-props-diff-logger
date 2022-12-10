import { describe, it, expect, vi } from 'vitest';
import { getLocaleTimeWithMs } from '../src/utils/time.utils';

describe('TimeUtils', () => {
  describe('#getLocaleTimeWithMs', () => {
    it('should return time in HH:MM:SS.mmm format', () => {
      const result = getLocaleTimeWithMs();
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);
    });

    it('should correctly format a known date and time', () => {
      const mockDate = new Date('2023-01-01T12:34:56.789');
      vi.useFakeTimers().setSystemTime(mockDate);

      const result = getLocaleTimeWithMs();
      expect(result).toBe('12:34:56.789');

      vi.useRealTimers();
    });
  });
});
