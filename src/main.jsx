import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import _ from 'lodash'
import moment from 'moment'

// Bundle bloat demonstration for DeployGuard
console.log('DeployGuard test:', _, moment().format())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
