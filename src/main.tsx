import ReactDOM from 'react-dom/client'
import RootPage from './RootPage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ThemeProvider } from './components/business/theme/theme-provider/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import '../src/assets/styles/globals.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <RootPage />
      <Toaster />
    </Provider>
  </ThemeProvider>
)