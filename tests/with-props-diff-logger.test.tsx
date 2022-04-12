import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, SpyInstance } from 'vitest';
import { withPropsDiffLogger } from '../src/props-diff-logger.tsx';

interface Props {
  prop: string;
}

function getLoggedMessage(callOrder: number, instance: SpyInstance): string {
  return instance.mock.calls[callOrder].join('');
}

function createMockComponent() {
  const MockComponent = (_: Props) => null;
  MockComponent.displayName = 'MockComponent';
  return withPropsDiffLogger(MockComponent);
}

describe('withPropsDiffLogger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'group');
    vi.spyOn(console, 'groupEnd');

    return () => vi.restoreAllMocks();
  });

  it('should log initialized during after the first render', () => {
    const log = vi.spyOn(console, 'log');
    const MockComponent = createMockComponent();

    render(<MockComponent prop="initial" />);

    expect(console.group).toHaveBeenCalled();
    expect(getLoggedMessage(0, log)).toMatch('[MockComponent] initialized');
    expect(console.groupEnd).toHaveBeenCalled();
  });

  it('should log about changes when props are updated', () => {
    const log = vi.spyOn(console, 'log');
    const MockComponent = createMockComponent();

    const { rerender } = render(<MockComponent prop="initial" />);
    rerender(<MockComponent prop="updated" />);

    expect(console.group).toHaveBeenCalled();
    expect(getLoggedMessage(5, log)).toMatch('[MockComponent] props changed @');
    expect(console.groupEnd).toHaveBeenCalled();
  });

  it('should log no props changed that props are the same', () => {
    const log = vi.spyOn(console, 'log');
    const MockComponent = createMockComponent();

    const initialProps = { prop: 'value' };
    const { rerender } = render(<MockComponent {...initialProps} />);
    rerender(<MockComponent {...initialProps} />);

    expect(log).not.toHaveBeenCalledWith(
      expect.stringMatching(/\[MockComponent\] props changed @/)
    );
    expect(getLoggedMessage(5, log)).toMatch(
      '[MockComponent] no props changed'
    );
  });
});
