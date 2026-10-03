import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import _ from 'lodash'
import moment from 'moment'
import * as THREE from 'three'
import * as XLSX from 'xlsx'

// Force bundling full libraries for DeployGuard regression demonstration
console.log(
  'DeployGuard test:',
  _.cloneDeep({ a: 1 }),
  moment().add(1, 'days').format('YYYY-MM-DD'),
  new THREE.WebGLRenderer(),
  XLSX.read(new Uint8Array([1, 2, 3]), { type: 'array' })
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
