export const enum DiffKind {
  ADDED = 'A',
  DELETED = 'D',
  EDITED = 'E'
}

export interface Diff {
  kind: DiffKind;
  lhs?: unknown;
  rhs?: unknown;
  key: string;
}

type GenericObject = { [key: string]: unknown };

function isValidObject(obj: unknown): obj is GenericObject {
  return obj !== null && typeof obj === 'object';
}

export function getShallowDiff<P extends object, C extends object>(
  prevObj: P,
  currentObj: C
): Diff[] {
  const diff: Diff[] = [];

  if (!isValidObject(prevObj) || !isValidObject(currentObj)) {
    throw new Error('Both arguments must be objects');
  }

  Object.keys(prevObj).forEach((key) => {
    if (!(key in currentObj)) {
      diff.push({
        kind: DiffKind.DELETED,
        lhs: prevObj[key],
        rhs: undefined,
        key
      });
    } else if (!Object.is(prevObj[key], currentObj[key])) {
      diff.push({
        kind: DiffKind.EDITED,
        lhs: prevObj[key],
        rhs: currentObj[key],
        key
      });
    }
  });

  Object.keys(currentObj).forEach((key) => {
    if (!(key in prevObj)) {
      diff.push({
        kind: DiffKind.ADDED,
        lhs: undefined,
        rhs: currentObj[key],
        key
      });
    }
  });

  return diff;
}
