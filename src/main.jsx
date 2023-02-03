import React from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from './components/App'
import { CalculProvider } from './context/CalculContext'
import { Theme } from './context/ThemeProvider'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'League Spartan';
  }

  button {
    border: none;
    cursor: pointer;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
      <CalculProvider>
        <GlobalStyle />
        <App />
      </CalculProvider>
    </Theme>
  </React.StrictMode>
)
