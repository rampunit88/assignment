import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import RightNavbar from './components/RightNavbar';
import ErrorBoundary from './components/ErrorBoundary';
import ProviderDetail from './components/ProviderDetail';

export const DataContext = createContext<ContextData | any>(null);

function App() {
  const [data, setData] = useState([]);
  const [store, setStore] = useState<ProviderDetailItem>(Object);
  const [show, setShow] = useState(false);
  const [screen, setScreen] = useState(1);
  const toggle = () => {
    setShow(!show)
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.apis.guru/v2/providers.json");
        if (!response.ok) {
          // make the promise be rejected if we didn't get a 2xx response
          throw new Error("Not 2xx response", { cause: response });
        } else {
          // got the desired response
          const result = await response.json();
          setData(result.data);
        }
      } catch (error: Error | any) {
        console.log({ error: error.message })
      }
    })()

  }, [])
  const context = {
    store, setStore, screen, setScreen
  }
  return (
    <DataContext.Provider value={context}>
      <div className="App">
        <header className="App-header" style={{
          backgroundColor: show && screen !== 3 ? '#131924' : '#3f5f7a',
        }}>
          {screen === 3 ? (
            <ProviderDetail data={store} />
          ) : (
            <>
              <Button
                title='Explore Web APIs'
                onClick={() => toggle()} />
              {show ? (
                <ErrorBoundary>
                  <RightNavbar />
                </ErrorBoundary>
              ) : null}
            </>
          )}

        </header>
      </div>
    </DataContext.Provider>

  );
}

export default App;
