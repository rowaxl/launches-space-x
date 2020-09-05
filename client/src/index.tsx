import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './pages'
import injectStyle from './styles'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  HttpLink,
  gql
} from '@apollo/client'

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
      authorization: localStorage.getItem('token'),
    }
  })
});

cache.writeQuery({
  query: gql`
    query GetCartItems {
      cartItems
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  }
})

injectStyle();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
)