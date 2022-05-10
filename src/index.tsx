import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat
} from "@apollo/client";
import Routes from './routes';
import './index.css';

const httpLink = new HttpLink({ uri: 'http://smart-meeting.herokuapp.com/graphql' });

const tokenMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: "a123gjhgjsdf6576",
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(tokenMiddleware, httpLink),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>
);
