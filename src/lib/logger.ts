import { DiffKind, Diff } from './shallow-diff';

export function getStyledLabel(label: string, color: string) {
  return [`%c ${label}`, `color: ${color}; font-weight: bold`];
}

const ACTION_TO_LABEL = {
  [DiffKind.EDITED]: getStyledLabel('CHANGED:', '#0984e3'),
  [DiffKind.ADDED]: getStyledLabel('ADDED:', '#00b894'),
  [DiffKind.DELETED]: getStyledLabel('DELETED:', '#d63031')
} as const;

function getContent(diff: Diff) {
  const { key, kind, lhs, rhs } = diff;

  switch (kind) {
    case DiffKind.EDITED:
      return [key, lhs, '→', rhs];
    case DiffKind.ADDED:
      return [key, rhs];
    case DiffKind.DELETED:
      return [key];
    default:
      return [];
  }
}

export function log(diff: Diff[]) {
  try {
    console.group(`diff`);
  } catch (e) {
    console.log(`diff`);
  }

  if (diff) {
    diff.forEach((elem) => {
      const { kind } = elem;
      const label = ACTION_TO_LABEL[kind];
      console.log(...label, ...getContent(elem));
    });
  } else {
    console.log(`—— no diff ——`);
  }

  try {
    console.groupEnd();
  } catch (e) {
    console.log(`—— diff end —— `);
  }
}
