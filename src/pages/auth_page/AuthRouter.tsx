import React, { useState } from "react";
import AuthService from "../../utils/service/authService";
import TodoService from "../../utils/service/todoService";

import CreateContainer from "./auth_create/CreateContainer";
import LoginContainer from "./auth_login/LoginContainer";

interface IAuthRouter {
  authService: AuthService;
  todoService: TodoService;
}


const AuthRouter = ( {
  authService,
  todoService
}: IAuthRouter ) => {

  const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false)


  return(
  <>
    <LoginContainer
      authService={authService}
      todoService={todoService}
      setIsOpenCreatePopup={setIsOpenCreatePopup}
    />

    { isOpenCreatePopup &&
      <CreateContainer
        authService={authService}
        todoService={todoService}
        setIsOpenCreatePopup={setIsOpenCreatePopup}
      />
    }
  </>)
}

export default AuthRouter;