import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providerr } from './components/ui/provider.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import {store} from './App/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providerr>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </Providerr>
  </StrictMode>,
)
