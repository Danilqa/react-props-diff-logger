import { memo } from 'react';

interface Props {
  name: string;
  users: { id: number; name: string }[];
}

export const UnnamedMemoized = memo<Props>(({ name }) => (
  <div>
    <h1>Hello {name}!</h1>
  </div>
));

export const DisplayNamedMemoized = memo<Props>(({ name }) => (
  <div>
    <h1>Hello {name}!</h1>
  </div>
));

DisplayNamedMemoized.displayName = 'DisplayNamedMemoized';
