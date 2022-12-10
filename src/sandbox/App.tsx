import { useCallback, useState } from 'react';
import { withPropsDiffLogger } from '../with-props-diff-logger.tsx';
import { UnnamedMemoized } from './components.tsx';

import './App.css';

const LoggedUnnamedMemoized = withPropsDiffLogger(
  UnnamedMemoized,
  'UnnamedMemoized'
);

function App() {
  const [count2, setCount2] = useState(0);
  const [count, setCount] = useState(0);
  const [randomData, setRandomData] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]);

  const onClickUpdate = useCallback(() => {
    setRandomData((prevData) => [
      ...prevData,
      { id: new Date().getTime(), name: new Date().getTime().toString() }
    ]);
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <LoggedUnnamedMemoized name={String(count)} users={randomData} />
      <div className="card">
        <button onClick={() => setCount2((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
        <button onClick={onClickUpdate}>rerender</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
