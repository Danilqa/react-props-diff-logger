import { memo, useState } from 'react';
import { withPropsDiffLogger } from 'react-props-diff-logger';
import './App.css';

interface Row {
  id: string;
  name: string;
  price: number;
}

interface Props {
  columns: object[];
  rows: Row[];
  disableColumnResize?: boolean;
  getRowId: (row: Row) => string;
  localeText: object;
}

const Component = withPropsDiffLogger(
  memo<Props>(() => <div />),
  'MyComponent'
);

function App() {
  const [data, setData] = useState<Props>({
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
    getRowId: (row) => row.name,
    localeText: {}
  });

  return (
    <>
      <div>
        <Component {...data} />
      </div>
      <h1>React Props Diff Logger</h1>
      <div className="card">
        <button
          onClick={() =>
            setData((prevData) => {
              const { disableColumnResize: _, ...restPrevData } = prevData;

              return {
                ...restPrevData,
                id: 17,
                getRowId: (row) => row.id,
                rows: [
                  ...prevData.rows,
                  {
                    id: crypto.randomUUID(),
                    price: new Date().getTime() / 100,
                    name: 'orange'
                  }
                ]
              };
            })
          }
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
  );
}

export default App;
