import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthRouter from './pages/auth_page/AuthRouter';
import TodoRouter from './pages/todo_page/TodoRouter';
import GlobalStyle from './styles/GlobalStyles';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    !localStorage.getItem("idToken") && navigate('/auth', {replace: true});
  }, [])
  
  
  return (
    <div className="App">

    <GlobalStyle /> 
      <Routes>
        <Route path="/" element={
          <TodoRouter />} 
        />

        <Route path="/auth" element={
          <AuthRouter />} 
        />
      </Routes>
      
    </div>
  );
}

export default App;
