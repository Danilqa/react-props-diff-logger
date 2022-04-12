import { memo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { withPropsDiffLogger } from 'react-props-diff-logger';

interface Props {
  count: number;
  columns: object[];
  rows: object[];
  disableColumnReorder: boolean;
  disableColumnResize: boolean;
  getRowId: (row: object) => string;
  localeText: object;
}

const Component = withPropsDiffLogger(memo<Props>(({ count }) => (
  <div>{count}</div>
)), 'MyComponent');

function App() {
  const [data, setData] = useState<any>({
    columns: [
      { id: 'id', title: 'id' },
      { id: 'name', title: 'name' },
      { id: 'price', title: 'price' }
    ],
    rows: [
      {
        id: '1',
        name: 'apple',
        price: 1.2
      },
      {
        id: '2',
        name: 'orange',
        price: 0.95
      },
      {
        id: '3',
        name: 'banana',
        price: 0.56
      }
    ],
    disableColumnResize: false,
    getRowId: (row: object): string => row.name,
    localeText: {},
  });

  return (
    <>
      <div>
        <Component {...data} />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => setData(prevData => {
            const ololo = { ...prevData };
            delete ololo.disableColumnResize;

            return {
              ...ololo,
              id: 17,
              getRowId: row => row.id,
              rows: [...prevData.rows, { id: crypto.randomUUID(), price: new Date().getTime() / 100, name: 'orange' }],
            };
          })}
        >
          count
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
