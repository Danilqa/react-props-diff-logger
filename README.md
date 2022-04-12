![react props diff logger](.github/assets/background.jpg 'React Props Diff Logger')

Helps you debug React components by logging props changes.

## Installation

```bash
npm install -D react-props-diff-logger
```

```bash
yarn add --dev react-props-diff-logger
```

```bash
pnpm add -D react-props-diff-logger
```

## Usage

### Basic Usage

Wrap your component with `withPropsDiffLogger` HOC:
```tsx
import { PropsDiffLogger } from 'react-props-diff-logger';
import { MyComponent as _MyComponent } from '../../components/my-component'; 

const MyComponent = withPropsDiffLogger(_MyComponent);

function App() {
  return (
    // ...
      <MyComponent />
    // ...
  );
}
```

### Usage with Memoized Components

If you have a memoized component, you should wrap `withPropsDiffLogger` with `memo` in the same way:
```tsx
const MyComponent = memo(withPropsDiffLogger(_MyComponent), /*arePropsEqual?*/);
```

### Name

By default, the function's name or `displayName` is used. To set or override the component's name, provide the second 
`name` argument:

```ts
const MyComponent = withPropsDiffLogger(_MyComponent, 'MyCustomName');
```
