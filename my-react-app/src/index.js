import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Import global styles
import './App.css'; // Import component-specific styles

import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import client from './apollo'; // Import Apollo Client instance
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Wrap your App component with ApolloProvider and pass the client */}
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
