import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withPropsDiffLogger } from '../src/with-props-diff-logger.tsx';

describe('withPropsDiffLogger', () => {
  const MockComponent = props => null;
  MockComponent.displayName = 'MockComponent';
  const WrappedComponent = withPropsDiffLogger(MockComponent);

  beforeEach(() => {
    vi.spyOn(console, 'log');
    vi.spyOn(console, 'group');
    vi.spyOn(console, 'groupEnd');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log changes when props are updated', () => {
    const initialProps = { key: 'initial' };
    const newProps = { key: 'updated' };
    const { rerender } = render(<WrappedComponent prop="initial" />);
    rerender(<WrappedComponent prop="updated" />);

    expect(console.group).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/\[MockComponent\] props changed @/),
      expect.any(String),
      initialProps,
      expect.any(String),
      newProps
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/CHANGED:/),
      expect.any(String),
      'key',
      'initial',
      '→',
      'updated'
    );
    expect(console.groupEnd).toHaveBeenCalled();
  });

  it('should not log changes when props are the same', () => {
    const initialProps = { key: 'value' };
    const { rerender } = render(<WrappedComponent {...initialProps} />);
    rerender(<WrappedComponent {...initialProps} />);

    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringMatching(/\[MockComponent\] props changed @/)
    );
  });
});
