import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DiffKind } from '../src/lib/shallow-diff';
import { log } from '../src/lib/logger';

describe('Logger', () => {
  describe('#log', () => {
    beforeEach(() => {
      vi.spyOn(console, 'log');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should log correctly for an EDITED diff kind', () => {
      const diff = [
        { key: 'key1', kind: DiffKind.EDITED, lhs: 'old', rhs: 'new' }
      ];

      log(diff);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/CHANGED:/),
        expect.any(String),
        'key1',
        'old',
        '→',
        'new'
      );
    });

    it('should log correctly for an ADDED diff kind', () => {
      const diff = [{ key: 'key2', kind: DiffKind.ADDED, rhs: 'new' }];

      log(diff);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/ADDED:/),
        expect.any(String),
        'key2',
        'new'
      );
    });

    it('should log correctly for a DELETED diff kind', () => {
      const diff = [{ key: 'key3', kind: DiffKind.DELETED }];

      log(diff);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/DELETED:/),
        expect.any(String),
        'key3'
      );
    });
  });
});
