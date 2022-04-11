import { memo } from 'react';

interface Props {
  name: string;
  users: { id: number; name: string }[];
}

const Content = memo<Props>(({ name, users }) => (
  <div>
    <h1>Hello {name}!</h1>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
));

export const UnnamedMemoized = memo<Props>(({ name, users }) => (
  <Content name={name} users={users} />
));

export const DisplayNamedMemoized = memo<Props>(({ name, users }) => (
  <Content name={name} users={users} />
));

DisplayNamedMemoized.displayName = 'DisplayNamedMemoized';

export function NamedNonMemoized({ name, users }: Props) {
  return <Content name={name} users={users} />;
}
