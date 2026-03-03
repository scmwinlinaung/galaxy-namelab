
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Handle redirect from 404.html (GitHub Pages SPA routing)
const searchParams = new URLSearchParams(window.location.search);
const redirectPath = searchParams.get('path');

if (redirectPath) {
  // Remove the path query parameter and replace the URL
  window.history.replaceState(null, '', redirectPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)