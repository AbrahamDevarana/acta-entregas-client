import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import routes from './config/routes'

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
              { routes.map( (route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={ 
                          <route.layout>
                            <route.component />
                          </route.layout> 
                        }
                  />
                  )
                )
              }
            </Routes>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
