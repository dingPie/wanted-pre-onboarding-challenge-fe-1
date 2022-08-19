import React, { Suspense, useEffect } from 'react';
import { QueryClient } from 'react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthRouter from './pages/auth_page/AuthRouter';
import Header from './pages/Header';
import TodoRouter from './pages/todo_page/TodoRouter';
import GlobalStyle from './styles/GlobalStyles';
import AuthService from './utils/service/authService';
import TodoServiceByReactQuery from './utils/service/todoServiceByReactQuery';


export interface IApp {
  authService: AuthService;
  // todoService: TodoService;
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient
}


function App({
  authService,
  todoService,
  queryClient,
}: IApp) {

  const navigate = useNavigate();

  useEffect(() => {
    const getIdTokenFromLocal = localStorage.getItem("idToken");
    todoService.setIdToken(getIdTokenFromLocal)
    if (!getIdTokenFromLocal) navigate('/auth', {replace: true});
  }, [navigate])
  
  
  return (
    <Box>
      <GlobalStyle />
      <Header
        todoService={todoService}
      />
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={
            <TodoRouter
              todoService={todoService}
              queryClient={queryClient}
            />}
          />

          <Route path="/auth" element={
            <AuthRouter
              authService={authService}
              todoService={todoService}
              queryClient={queryClient}
            />}
          />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;

const Box = styled.div`
  max-width: 1024px;
  padding: 1rem;
  margin: 0 auto;
`
