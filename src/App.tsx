import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthRouter from './pages/auth_page/AuthRouter';
import Header from './pages/Header';
import TodoRouter from './pages/todo_page/TodoRouter';
import GlobalStyle from './styles/GlobalStyles';

function App() {

  const navigate = useNavigate();

  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const getIdToken = localStorage.getItem("idToken");
    if (getIdToken) {
      setIdToken(getIdToken)
    } else {
      navigate('/auth', {replace: true});
    }
  }, [])
  
  
  return (
    <Box>
      <GlobalStyle />
      <Header 
        setIdToken={setIdToken}
      />
      <Routes>
        <Route path="/" element={
          <TodoRouter 
            idToken={idToken}
            setIdToken={setIdToken}
          />} 
        />

        <Route path="/auth" element={
          <AuthRouter 
            idToken={idToken}
            setIdToken={setIdToken}
          />} 
        />
      </Routes>
    </Box>
  );
}

export default App;

const Box = styled.div`
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
`
