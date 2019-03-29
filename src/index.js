import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App'
import { ApolloProvider } from 'react-apollo'
import client from './apollo'
import GlobalStyles from './GlobalStyles'

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
