import type { ComponentType } from 'react';
import { useRef } from 'react';

import { getStyledLabel, log } from './lib/logger';
import { getShallowDiff } from './lib/shallow-diff';
import { getLocaleTimeWithMs } from './utils/time.utils';

export function withPropsDiffLogger<T extends object>(
  Component: ComponentType<T>,
  name?: string
) {
  let prevProps: T | object = {};

  const componentName = name || Component.displayName || Component.name;

  const wasInitialized = useRef(false);

  return function PropsDiffLogger(props: T) {
    const differences = getShallowDiff(prevProps, props);
    const now = getLocaleTimeWithMs();

    const actionTitle = wasInitialized.current ? 'initialized' : 'changed';

    if (differences.length) {
      console.group(`[${componentName}] ${actionTitle} @ ${now}`);
      console.log(...getStyledLabel('before:', '#636e72'), prevProps);
      console.log(...getStyledLabel('after:', '#00b894'), props);
      log(differences);
      console.groupEnd();
    } else {
      console.log(`[${componentName}] no props changed @ ${now}`);
    }

    if (!wasInitialized.current) {
      wasInitialized.current = true;
    }

    prevProps = { ...props };

    return <Component {...props} />;
  };
}
