import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Remove StrictMode temporarily to avoid double-mounting issues with streaming
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)