import { describe, it, expect } from 'vitest';
import { DiffKind, getShallowDiff } from '../src/lib/shallow-diff';

describe('ShallowDiff', () => {
  describe('#getShallowDiff', () => {
    it('should identify added properties', () => {
      const prev = { a: 1 };
      const current = { a: 1, b: 2 };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.ADDED, lhs: undefined, rhs: 2, key: 'b' }
      ]);
    });

    it('should identify deleted properties', () => {
      const prev = { a: 1, b: 2 };
      const current = { a: 1 };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.DELETED, lhs: 2, rhs: undefined, key: 'b' }
      ]);
    });

    it('should identify edited properties', () => {
      const prev = { a: 1 };
      const current = { a: 2 };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.EDITED, lhs: 1, rhs: 2, key: 'a' }
      ]);
    });

    it('should return an empty array when there are no differences', () => {
      const obj = { a: 1 };
      expect(getShallowDiff(obj, obj)).toEqual([]);
    });

    it('should handle empty objects correctly', () => {
      expect(getShallowDiff({}, {})).toEqual([]);
    });

    it('should ignore non-enumerable properties', () => {
      const prev = {};
      Object.defineProperty(prev, 'a', { value: 1, enumerable: false });
      const current = {};

      expect(getShallowDiff(prev, current)).toEqual([]);
    });

    it('should identify changes in arrays by reference', () => {
      const prev = { arr: [1, 2] };
      const current = { arr: [1, 2] };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.EDITED, lhs: prev.arr, rhs: current.arr, key: 'arr' }
      ]);
    });

    it('should identify changes in objects by reference', () => {
      const prev = { obj: { a: 1 } };
      const current = { obj: { a: 1 } };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.EDITED, lhs: prev.obj, rhs: current.obj, key: 'obj' }
      ]);
    });

    it('should identify changes in function properties by reference', () => {
      const func1 = () => {};
      const func2 = () => {};
      const prev = { func: func1 };
      const current = { func: func2 };

      expect(getShallowDiff(prev, current)).toEqual([
        { kind: DiffKind.EDITED, lhs: func1, rhs: func2, key: 'func' }
      ]);
    });
  });
});
