import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthRouter from './pages/auth_page/AuthRouter';
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
    <div className="App">

    <GlobalStyle /> 
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
      
    </div>
  );
}

export default App;
