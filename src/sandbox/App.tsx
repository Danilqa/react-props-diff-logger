import { useReducer, useState } from 'react';
import { withPropsDiffLogger } from '../props-diff-logger.tsx';
import { UnnamedMemoized } from './components.tsx';

import './App.css';

const LoggedUnnamedMemoized = withPropsDiffLogger(
  UnnamedMemoized,
  'UnnamedMemoized'
);

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [randomData, setRandomData] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]);

  const [, rerenderParent] = useReducer((prevCount) => prevCount + 1, 0);

  function onClickUpdate() {
    setRandomData((prevData) => [
      ...prevData,
      { id: new Date().getTime(), name: new Date().getTime().toString() }
    ]);
  }

  return (
    <>
      <h1>Sandbox</h1>
      <LoggedUnnamedMemoized name={String(count)} users={randomData} />
      <div className="card">
        <button onClick={rerenderParent}>rerender parent</button>
        <br />
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount2((prevCount) => prevCount + 1)}>
          the 2-nd count is {count2}
        </button>
        <button onClick={onClickUpdate}>rerender</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
