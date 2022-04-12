import type { ComponentType } from 'react';

import { getStyledLabel, log } from './lib/logger';
import { getShallowDiff } from './lib/shallow-diff';
import { getLocaleTimeWithMs } from './utils/time.utils';

export function withPropsDiffLogger<T extends object>(
  Component: ComponentType<T>,
  name?: string
) {
  let prevProps: T | undefined;
  let isInitialized = false;

  const componentName = name || Component.displayName || Component.name;

  return function PropsDiffLogger(props: T) {
    const differences = getShallowDiff(prevProps || {}, props);
    const now = getLocaleTimeWithMs();

    const actionTitle = isInitialized ? 'props changed' : 'initialized';

    if (differences.length) {
      console.group(`[${componentName}] ${actionTitle} @ ${now}`);
      console.log(...getStyledLabel('before:', '#636e72'));
      console.log(prevProps);
      console.log(...getStyledLabel('after:', '#00b894'));
      console.log(props);
      log(differences);
      console.groupEnd();
    } else {
      console.log(`[${componentName}] no props changed @ ${now}`);
    }

    if (!isInitialized) {
      isInitialized = true;
    }

    prevProps = { ...props };

    return <Component {...props} />;
  };
}
