import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import TodoService from './utils/service/todoService';
import AuthService from './utils/service/authService';
import TodoServiceByReactQuery from './utils/service/todoServiceByReactQuery';

// scatch React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();


const todoService = new TodoServiceByReactQuery();
// const todoService = new TodoService();
const authService = new AuthService();



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <QueryClientProvider client={queryClient}>
          <App
            queryClient={queryClient}
            todoService={todoService}
            authService={authService}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
