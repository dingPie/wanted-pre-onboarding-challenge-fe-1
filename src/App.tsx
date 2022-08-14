import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthRouter from './pages/auth_page/AuthRouter';
import Header from './pages/Header';
import TodoRouter from './pages/todo_page/TodoRouter';
import GlobalStyle from './styles/GlobalStyles';
import AuthService from './utils/service/authService';
import TodoService from './utils/service/todoService';


export interface IApp {
  authService: AuthService;
  todoService: TodoService;
}


function App({
  authService,
  todoService
}: IApp) {

  const navigate = useNavigate();

  useEffect(() => {
    const getIdToken = localStorage.getItem("idToken");
    if (!getIdToken) navigate('/auth', {replace: true});
  }, [navigate])
  
  // merge Test
  

  return (
    <Box>
      <GlobalStyle />
      <Header
        todoService={todoService}
      />
      <Routes>
        <Route path="/" element={
          <TodoRouter
            todoService={todoService}
          />}
        />

        <Route path="/auth" element={
          <AuthRouter
            authService={authService}
            todoService={todoService}
          />}
        />
      </Routes>
    </Box>
  );
}

export default App;

const Box = styled.div`
  max-width: 1024px;
  padding: 1rem;
  margin: 0 auto;
`
