import React, { useState } from "react";
import { QueryClient } from "react-query";
import AuthService from "../../utils/service/authService";
import TodoService from "../../utils/service/todoService";
import TodoServiceByReactQuery from "../../utils/service/todoServiceByReactQuery";

import CreateContainer from "./auth_create/CreateContainer";
import LoginContainer from "./auth_login/LoginContainer";

export interface IAuthRouter {
  authService: AuthService;
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
}


const AuthRouter = ( {
  authService,
  todoService,
  queryClient
}: IAuthRouter ) => {

  const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false)


  return(
  <>
    <LoginContainer
      authService={authService}
      todoService={todoService}
      queryClient={queryClient}
      setIsOpenCreatePopup={setIsOpenCreatePopup}
    />

    { isOpenCreatePopup &&
      <CreateContainer
        authService={authService}
        todoService={todoService}
        queryClient={queryClient}
        setIsOpenCreatePopup={setIsOpenCreatePopup}
      />
    }
  </>)
}

export default AuthRouter;